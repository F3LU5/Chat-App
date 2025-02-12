using System;
using API.Controllers;
using API.DataTransferObject;
using API.Entities;
using API.Interfaces;
using API.Help;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class MessageRepo(DataContext context, IMapper mapper) : IMessageRepo
{
    public void AddGroup(Group group)
    {
        context.Groups.Add(group);
    }


    public void AddMessage(Message message)
    {
        context.Messages.Add(message);
    }

    public void DeleteMessage(Message message)
    {
        context.Messages.Remove(message);
    }

    public async Task<Message?> GetMessage(int id)
    {
        return await context.Messages.FindAsync(id);
    }

    public async Task<PageList<MessageDTO>> GetMessageForUser(MessagePar messagePar)
    {
        var query = context.Messages.OrderByDescending(x => x.MessageSent).AsQueryable();
        query = messagePar.Container switch{
            "Inbox" => query.Where(x=>x.Recipient.UserName == messagePar.Username && x.RecipientDeleted == false),
            "Outbox"=> query.Where(x=>x.Sender.UserName==messagePar.Username && x.SenderDeleted == false),
            _=>query.Where(x=>x.Recipient.UserName==messagePar.Username&&x.DateRead==null && x.RecipientDeleted == false)
        };
        var message = query.ProjectTo<MessageDTO>(mapper.ConfigurationProvider);
        return await PageList<MessageDTO>.CreateAsync(message, messagePar.PageNumber, messagePar.PageSize);
    }

    public async Task<Group?> GetMessageGroup(string groupName)
    {
        return await context.Groups
        .Include(x => x.Connections)
        .FirstOrDefaultAsync(x => x.Name == groupName);
    }


    public async Task<IEnumerable<MessageDTO>> GetMessageThread(string currentUsername, string recipientUsername)
    {
        var messages = await context.Messages.Include(a=>a.Sender).ThenInclude(a=>a.Images).Include(a=>a.Recipient).ThenInclude(a=>a.Images).Where(a=>
            a.RecipientUsername==currentUsername&& a.RecipientDeleted == false &&a.SenderUsername==recipientUsername || a.SenderUsername == currentUsername && a.SenderDeleted == false && a.RecipientUsername == recipientUsername)
            .OrderBy(x=>x.MessageSent)
            .ToListAsync();
            var unreadMessages = messages.Where(x=> x.DateRead==null && x.RecipientUsername==currentUsername).ToList();
            if(unreadMessages.Count != 0){
                unreadMessages.ForEach(x=>x.DateRead=DateTime.UtcNow);
                await context.SaveChangesAsync();
            }
            return mapper.Map<IEnumerable<MessageDTO>>(messages);
    }

    public async Task<Connection?> GetConnection(string connectionId)
    {
        return await context.Connections.FindAsync(connectionId);
    }

    public void RemoveConnectrion(Connection connection)
    {
        context.Connections.Remove(connection);
    }


    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}
