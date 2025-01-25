using System;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DataTransferObject;
using API.Entities;
using API.Interfejsy;
using API.Uslugi;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext context, UslugiToken uslugiToken, IMapper mapper) : BaseApiController
{
    [HttpPost("register")] //account/register
    public async Task<ActionResult<UzytkownikDTO>> Register(RegDTO regDTO){

        if (await Istnieje(regDTO.UserName)) 
        return BadRequest("Nazwa użytkownika jest zajęta");

        using var hmac = new HMACSHA512();

        var user = mapper.Map<AppUser>(regDTO);
        user.UserName = regDTO.UserName.ToLower();
        user.hashaslo = hmac.ComputeHash(Encoding.UTF8.GetBytes(regDTO.Password));
        user.salthaslo = hmac.Key;

        context.Users.Add(user);
        await context.SaveChangesAsync();
        return new UzytkownikDTO
        {
            Username = user.UserName,
            Token = uslugiToken.StworzToken(user),
            Onas = user.Onas
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UzytkownikDTO>> Login(LoginDTO loginDTO){

        var user = await context.Users
        .Include(p => p.Zdjecia)
            .FirstOrDefaultAsync(x => x.UserName == loginDTO.UserName.ToLower());
        if(user == null) 
        return Unauthorized("Niepoprawny Login lub hasło");

        using var hmac = new HMACSHA512(user.salthaslo);

        var obliczonyhash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

        for (int i = 0; i < obliczonyhash.Length; i++)  //zapętlenie elementów w obliczonej tablicy hash
        {
            if(obliczonyhash[i] != user.hashaslo[i])
            return Unauthorized("Niepoprawne hasło");
        }
        
        return new UzytkownikDTO
        {
            Username = user.UserName,
            Onas = user.Onas,
            Token = uslugiToken.StworzToken(user),
            ZdjecieUrl = user.Zdjecia.FirstOrDefault(a => a.Glownezdj)?.Url
        };
    }
    
    private async Task<bool> Istnieje(string username){

        return await context.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower() );   //Marcin != marcin / marcin1
    }
}
