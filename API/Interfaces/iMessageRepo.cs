using System;
using API.DataTransferObject;
using API.Entities;
using API.Help;

namespace API.Interfaces;

public interface IMessageRepo
{
    void AddMessage(Message message);
    void DeleteMessage(Message message);
    Task<Message?> GetMessage(int id);
    Task<PageList<MessageDTO>> GetMessageForUser(MessagePar messagePar);
    Task<IEnumerable<MessageDTO>> GetMessageThread(string currentUsername, string recipientUsername);
    Task<bool> SaveAllAsync();
    void AddGroup(Group group);
    void RemoveConnectrion(Connection connection);
    Task<Connection?> GetConnection(string connectionId);
    Task<Group?> GetMessageGroup(string groupName);
    
}
