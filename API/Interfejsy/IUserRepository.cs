using System;
using System.ComponentModel;
using API.DataTransferObject;
using API.Entities;

namespace API.Uslugi;

public interface IUserRepository
{
    void Update(AppUser user);
    Task<bool> ZapiszWszystkieAsync();
    Task<IEnumerable<AppUser>> GetUsersAsync(); //jezeli nie ma w bazie uzytkowników zwrócona zostanie pusta tablica

    Task<AppUser?> GetUserByIDAsync(int id);
    Task<AppUser?> GetUserByUsernameAsync(string username);
    Task<IEnumerable<MemberDTO>> GetMembersAsync();
    Task<MemberDTO?> GetMemberAsync(string username);
    object GetUserByUsernameAsync(object username);
}
