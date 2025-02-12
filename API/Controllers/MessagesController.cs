using System;
using API.DataTransferObject;
using API.Entities;
using API.Interfaces;
using API.Help;
using API.Extensions;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
[Authorize]
public class MessagesController(IMessageRepo messageRepo, IUserRepository userRepository, IMapper mapper) : BaseApiController
{
    [HttpPost]
    public async Task<ActionResult<MessageDTO>> CreateMessage(CreateMessageDTO createMessageDTO){
        var username = User.GetUsername();
        if(username == createMessageDTO.RecipientUsername.ToLower())
        return BadRequest("Nie możesz wysłać do siebie wiadomości!");
        var sender = await userRepository.GetUserByUsernameAsync(username);
        var recipient = await userRepository.GetUserByUsernameAsync(createMessageDTO.RecipientUsername);
        if(sender == null || recipient == null || sender.UserName == null || recipient.UserName == null) 
        return BadRequest("Nie można wysłać wiadomości Aktualnie");
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
        
        Response.AddHeaderPagination(messages);
        return messages;
    }
    [HttpGet("thread/{username}")]     
    public async Task<ActionResult<IEnumerable<MessageDTO>>> GetMessageThread(string username){
        var currentUsername=User.GetUsername();
        return Ok(await messageRepo.GetMessageThread(currentUsername, username));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteMessage(int id){
        var username = User.GetUsername();
        var message = await messageRepo.GetMessage(id);
        if(message == null) return BadRequest("Nie mozna usunąć wiadomości");
        if(message.SenderUsername != username && message.RecipientUsername != username) return Forbid();
        if(message.SenderUsername == username) message.SenderDeleted = true;
        if(message.RecipientUsername == username) message.RecipientDeleted = true;
        if(message is {SenderDeleted: true, RecipientDeleted: true}){
            messageRepo.DeleteMessage(message);
        }
        if(await messageRepo.SaveAllAsync()) return Ok();
        return BadRequest("Problem z usunieciem wiadomosci");
    }
}
