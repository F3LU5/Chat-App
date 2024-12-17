using System;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DataTransferObject;
using API.Entities;
using API.Interfejsy;
using API.Uslugi;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext context, UslugiToken uslugiToken) : BaseApiController
{
    [HttpPost("register")] //account/register
    public async Task<ActionResult<UzytkownikDTO>> Register(RegDTO regDTO){

        if (await Istnieje(regDTO.UserName)) 
        return BadRequest("Nazwa użytkownika jest zajęta");

        return Ok();
        // using var hmac = new HMACSHA512();

        // var user = new AppUser{
        //     UserName = regDTO.UserName.ToLower(),
        //     hashaslo = hmac.ComputeHash(Encoding.UTF8.GetBytes(regDTO.Password)),
        //     salthaslo = hmac.Key
        // };
        // context.Users.Add(user);
        // await context.SaveChangesAsync();
        // return new UzytkownikDTO
        // {
        //     Username = user.UserName,
        //     Token = uslugiToken.StworzToken(user)
        // };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UzytkownikDTO>> Login(LoginDTO loginDTO){

        var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == loginDTO.UserName.ToLower());
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
            Token = uslugiToken.StworzToken(user)
        };
    }
    
    private async Task<bool> Istnieje(string username){

        return await context.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower() );   //Marcin != marcin / marcin1
    }
}
