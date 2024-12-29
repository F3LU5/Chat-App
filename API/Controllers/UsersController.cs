using System;
using System.Security.Claims;
using API.Data;
using API.DataTransferObject;
using API.Entities;
using API.Uslugi;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;
[Authorize]
public class UsersController(IUserRepository userRepository, IMapper mapper) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers()
    {
        var users = await userRepository.GetMembersAsync();

        return Ok(users);
    }
        [HttpGet("{username}")] // /api/users/1
    public async Task<ActionResult<MemberDTO>> GetUser(string username)
    {
        var user = await userRepository.GetMemberAsync(username);

        if(user == null) return NotFound();

        return user;
    }

    [HttpPut]
    public async Task<ActionResult> UpdateUser(AktualizacjaCzlonkaDTO aktualizacjaCzlonkaDTO)
    {
        var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if(username == null) return BadRequest("Nie znaleziono nazwy użytkownika w tokenie");

        var user = await userRepository.GetUserByUsernameAsync(username);
        if(user == null) return BadRequest("Nie można znaleźć użytkownika");
        mapper.Map(aktualizacjaCzlonkaDTO, user);

        if(await userRepository.ZapiszWszystkieAsync()) return NoContent();
        return BadRequest("Nie udało się zaktualizowac użytkownika");
    }
}
