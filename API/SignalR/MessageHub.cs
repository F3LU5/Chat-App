using System;
using API.DataTransferObject;
using API.Entities;
using API.Interfejsy;
using API.Rozszerzenia;
using API.Uslugi;
using AutoMapper;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR;

public class MessageHub(IMessageRepo messageRepo, IUserRepository userRepository, IMapper mapper, IHubContext<PresenceHub> presenceHub) : Hub
{
    public override async Task OnConnectedAsync()
    {
        var httpContext = Context.GetHttpContext();
        var otherUser = httpContext?.Request.Query["user"];

        if(Context.User == null || string.IsNullOrEmpty(otherUser)) 
            throw new Exception("Nie mozna dołączyć do grupy");
        var groupName = GetGroupName(Context.User.GetUsername(), otherUser);
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        await AddToGroup(groupName);

        var messages = await messageRepo.GetMessageThread(Context.User.GetUsername(), otherUser!);

        await Clients.Group(groupName).SendAsync("ReceiveMessageThread", messages);
        
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        await RemoveMessageGroup();
        await base.OnDisconnectedAsync(exception);
    }

    public async Task SendMessage(CreateMessageDTO createMessageDTO)
    {
        var username = Context.User?.GetUsername() ?? throw new Exception("Nie można pobrać uzytkownika");
        if(username == createMessageDTO.RecipientUsername.ToLower())
            throw new HubException("Nie mozesz wysłać wiadomości sam do siebie");

        var sender = await userRepository.GetUserByUsernameAsync(username);
        var recipient = await userRepository.GetUserByUsernameAsync(createMessageDTO.RecipientUsername);

        if(sender == null || recipient == null || sender.UserName == null || recipient.UserName == null) 
            throw new HubException("Nie można wysłać wiadomości Aktualnie");

        var message = new Message{
            Sender = sender,
            Recipient = recipient,
            SenderUsername = sender.UserName,
            RecipientUsername = recipient.UserName,
            Content = createMessageDTO.Content
        };

        var groupName = GetGroupName(sender.UserName, recipient.UserName);
        var group = await messageRepo.GetMessageGroup(groupName);

        if (group != null && group.Polaczenia.Any(x => x.Username == recipient.UserName))
        {
            message.DateRead = DateTime.UtcNow;
        }
        else{
            var polaczenia = await PresenceTracker.PolaczeniezUzytkownikiem(recipient.UserName);
            if(polaczenia != null && polaczenia?.Count != null){
                await presenceHub.Clients.Clients(polaczenia).SendAsync("NewMessageReceived", new {username = sender.UserName, onas = sender.Onas});
            }
        }
        messageRepo.AddMessage(message);

        if (await messageRepo.SaveAllAsync())
        {
            await Clients.Group(groupName).SendAsync("NewMessages", mapper.Map<MessageDTO>(message));        //tu zobaczyc moze zle byc MessageDTO
        }

    }

    private async Task<bool> AddToGroup(string groupName)
    {
        var username =Context.User?.GetUsername() ?? throw new Exception("Nie mozna pobrać nazwy uzytkownika");
        var group = await messageRepo.GetMessageGroup(groupName);
        var polaczenie = new Polaczenie{PolaczenieId = Context.ConnectionId, Username = username};

        if(group == null){
            group = new Group{Name = groupName};
            messageRepo.AddGroup(group);
        }
        group.Polaczenia.Add(polaczenie);
        return await messageRepo.SaveAllAsync();
    }

    private async Task RemoveMessageGroup()
    {
        var polaczenie = await messageRepo.GetPolaczenie(Context.ConnectionId);
        if(polaczenie != null)
        {
            messageRepo.RemoveConnectrion(polaczenie);
            await messageRepo.SaveAllAsync();
        }
    }

    private string GetGroupName(string caller, string? other)
    {
        var stringCompare = string.CompareOrdinal(caller, other) < 0;
        return stringCompare ? $"{caller}-{other}" : $"{other}-{caller}";
    }
}
