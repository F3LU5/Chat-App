using System.Security.Claims;
using API.DataTransferObject;
using API.Entities;
using API.Interfejsy;
using API.Rozszerzenia;
using API.Uslugi;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
[Authorize]
public class UsersController(IUserRepository userRepository, IMapper mapper, DodawanieZdjeciaService dodawanieZdjecia) : BaseApiController
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

        var user = await userRepository.GetUserByUsernameAsync(User.GetUsername());
        if(user == null) return BadRequest("Nie można znaleźć użytkownika");
        mapper.Map(aktualizacjaCzlonkaDTO, user);

        if(await userRepository.ZapiszWszystkieAsync()) return NoContent();
        return BadRequest("Nie udało się zaktualizowac użytkownika");
    }

    [HttpPost("add-photo")]
    public async Task<ActionResult<ZdjecieDto>> AddPhoto(IFormFile file)
    {
        var user = await userRepository.GetUserByUsernameAsync(User.GetUsername());
        if(user == null) return BadRequest("Nie mozna zaktualizowac uzytkownika");
        var result = await dodawanieZdjecia.AddZdjecieAsync(file);

        if(result.Error != null) return BadRequest(result.Error.Message);

        var photo = new Zdjecie
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId
        };
        user.Zdjecia.Add(photo);
        if (await userRepository.ZapiszWszystkieAsync()) 
        return CreatedAtAction(nameof(GetUser), new {username = user.UserName}, mapper.Map<ZdjecieDto>(photo));
        return BadRequest("Problem z dodaniem zdjecia");
    }
}
