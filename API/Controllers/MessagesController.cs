using System;
using API.DataTransferObject;
using API.Entities;
using API.Interfejsy;
using API.Pomoc;
using API.Rozszerzenia;
using API.Uslugi;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class MessagesController(IMessageRepo messageRepo, IUserRepository userRepository, IMapper mapper) : BaseApiController
{
    [HttpPost]
    public async Task<ActionResult<MessageDTO>> CreateMessage(CreateMessageDTO createMessageDTO){
        var username = User.GetUsername();
        if(username == createMessageDTO.RecipientUsername.ToLower())
        return BadRequest("Nie możesz wysłać do siebie wiadomości!");
        var sender = await userRepository.GetUserByUsernameAsync(username);
        var recipient = await userRepository.GetUserByUsernameAsync(createMessageDTO.RecipientUsername);
        if(sender == null || recipient == null) return BadRequest("Nie można wysłać wiadomości Aktualnie");
        var message = new Message{
            Sender = sender,
            Recipient = recipient,
            SenderUsername = sender.UserName,
            RecipientUsername = recipient.UserName,
            Content = createMessageDTO.Content
        };
        messageRepo.AddMessage(message);
        if (await messageRepo.SaveAllAsync()) return Ok(mapper.Map<MessageDTO>(message));
        return BadRequest("Nie udało sie zapisać wiadomości");
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MessageDTO>>> getMessagesForUser([FromQuery]MessagePar messagePar){
        messagePar.Username = User.GetUsername();
        var messages = await messageRepo.GetMessageForUser(messagePar);
        
        Response.DodajPaginacjeNaglowka(messages);
        return messages;
    }
    [HttpGet("thread/{username}")]     
    public async Task<ActionResult<IEnumerable<MessageDTO>>> GetMessageThread(string username){
        var currentUsername=User.GetUsername();
        return Ok(await messageRepo.GetMessageThread(currentUsername, username));
    }
}
