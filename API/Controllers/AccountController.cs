using System;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DataTransferObject;
using API.Entities;
using API.Interfejsy;
using API.Uslugi;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(UserManager<AppUser> userManager, UslugiToken uslugiToken, IMapper mapper) : BaseApiController
{
    [HttpPost("register")] //account/register
    public async Task<ActionResult<UzytkownikDTO>> Register(RegDTO regDTO){

        if (await Istnieje(regDTO.UserName)) 
        return BadRequest("Nazwa użytkownika jest zajęta");


        var user = mapper.Map<AppUser>(regDTO);
        user.UserName = regDTO.UserName.ToLower();

        var result = await userManager.CreateAsync(user, regDTO.Password);

        if(!result.Succeeded) return BadRequest(result.Errors);

        return new UzytkownikDTO
        {
            Username = user.UserName,
            Token = await uslugiToken.StworzToken(user),
            Onas = user.Onas
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UzytkownikDTO>> Login(LoginDTO loginDTO){

        var user = await userManager.Users
        .Include(p => p.Zdjecia)
            .FirstOrDefaultAsync(x => x.NormalizedUserName == loginDTO.UserName.ToUpper());
        if(user == null || user.UserName == null) 
        return Unauthorized("Niepoprawny Login lub hasło");

        var result = await userManager.CheckPasswordAsync(user, loginDTO.Password);
        if(!result) return Unauthorized();
        
        return new UzytkownikDTO
        {
            Username = user.UserName,
            Onas = user.Onas,
            Token = await uslugiToken.StworzToken(user),
            ZdjecieUrl = user.Zdjecia.FirstOrDefault(a => a.Glownezdj)?.Url
        };
    }
    
    private async Task<bool> Istnieje(string username){

        return await userManager.Users.AnyAsync(x => x.NormalizedUserName == username.ToUpper() );   //Marcin != marcin / marcin1
    }
}
