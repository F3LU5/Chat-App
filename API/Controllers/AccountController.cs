using System;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DataTransferObject;
using API.Entities;
using API.Interfaces;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(UserManager<AppUser> userManager, TokenServices tokenServices, IMapper mapper) : BaseApiController
{
    [HttpPost("register")] //account/register
    public async Task<ActionResult<UserDTO>> Register(RegDTO regDTO){

        if (await Exists(regDTO.UserName)) 
        return BadRequest("Nazwa użytkownika jest zajęta");


        var user = mapper.Map<AppUser>(regDTO);
        user.UserName = regDTO.UserName.ToLower();

        var result = await userManager.CreateAsync(user, regDTO.Password);

        if(!result.Succeeded) return BadRequest(result.Errors);

        return new UserDTO
        {
            Username = user.UserName,
            Token = await tokenServices.CreateToken(user),
            Initials = user.Initials
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO){

        var user = await userManager.Users
        .Include(p => p.Images)
            .FirstOrDefaultAsync(x => x.NormalizedUserName == loginDTO.UserName.ToUpper());
        if(user == null || user.UserName == null) 
        return Unauthorized("Niepoprawny Login lub hasło");

        var result = await userManager.CheckPasswordAsync(user, loginDTO.Password);
        if(!result) return Unauthorized();
        
        return new UserDTO
        {
            Username = user.UserName,
            Initials = user.Initials,
            Token = await tokenServices.CreateToken(user),
            ImageUrl = user.Images.FirstOrDefault(a => a.MainImage)?.Url
        };
    }
    
    private async Task<bool> Exists(string username){

        return await userManager.Users.AnyAsync(x => x.NormalizedUserName == username.ToUpper() );   //Marcin != marcin / marcin1
    }
}
