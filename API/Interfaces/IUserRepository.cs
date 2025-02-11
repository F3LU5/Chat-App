using System;
using System.ComponentModel;
using API.DataTransferObject;
using API.Entities;
using API.Help;

namespace API.Services;

public interface IUserRepository
{
    void Update(AppUser user);
    Task<bool> SaveAllAsync();
    Task<IEnumerable<AppUser>> GetUsersAsync(); //jezeli nie ma w bazie uzytkowników zwrócona zostanie pusta tablica

    Task<AppUser?> GetUserByIDAsync(int id);
    Task<AppUser?> GetUserByUsernameAsync(string username);
    Task<PageList<MemberDTO>> GetMembersAsync(UserValue userValue);
    Task<MemberDTO?> GetMemberAsync(string username);
    object GetUserByUsernameAsync(object username);
}
