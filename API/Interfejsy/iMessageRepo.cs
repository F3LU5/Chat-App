using System;
using API.DataTransferObject;
using API.Entities;
using API.Pomoc;

namespace API.Interfejsy;

public interface IMessageRepo
{
    void AddMessage(Message message);
    void DeleteMessage(Message message);
    Task<Message?> GetMessage(int id);
    Task<ListaStron<MessageDTO>> GetMessageForUser(MessagePar messagePar);
    Task<IEnumerable<MessageDTO>> GetMessageThread(string currentUsername, string RecipientUsername);
    Task<bool> SaveAllAsync();
}
