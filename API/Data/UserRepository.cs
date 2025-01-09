using System;
using API.DataTransferObject;
using API.Entities;
using API.Pomoc;
using API.Uslugi;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class UserRepository(DataContext context, IMapper mapper) : IUserRepository
{
    public async Task<AppUser?> GetUserByIDAsync(int id)
    {
        return await context.Users.FindAsync(id);
    }

    public async Task<AppUser?> GetUserByUsernameAsync(string username)
    {
        return await context.Users
        .Include(x => x.Zdjecia)
        .SingleOrDefaultAsync(x => x.UserName == username);
    }

    public async Task<IEnumerable<AppUser>> GetUsersAsync()
    {
        return await context.Users
        .Include(x => x.Zdjecia)
        .ToListAsync();
    }
    public async Task<bool> ZapiszWszystkieAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
    public void Update(AppUser user)
    {
        context.Entry(user).State = EntityState.Modified;
    }

    public async Task<ListaStron<MemberDTO>> GetMembersAsync(WartoscUzytkownika wartoscUzytkownika)
    {
        var query = context.Users
        .ProjectTo<MemberDTO>(mapper.ConfigurationProvider);
        return await ListaStron<MemberDTO>.StworzAsync(query, wartoscUzytkownika.PageNumber, wartoscUzytkownika.PageSize);
    }

    public async Task<MemberDTO?> GetMemberAsync(string username)
    {
        return await context.Users
        .Where(a=>a.UserName == username)
        .ProjectTo<MemberDTO>(mapper.ConfigurationProvider)
        .SingleOrDefaultAsync();
    }

    public object GetUserByUsernameAsync(object username)
    {
        throw new NotImplementedException();
    }
}
