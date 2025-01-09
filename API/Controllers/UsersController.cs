using System.Security.Claims;
using API.DataTransferObject;
using API.Entities;
using API.Interfejsy;
using API.Pomoc;
using API.Rozszerzenia;
using API.Uslugi;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
[Authorize]
public class UsersController(IUserRepository userRepository, IMapper mapper, DodawanieZdjeciaService dodawanieZdjecia) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers([FromQuery]WartoscUzytkownika wartoscUzytkownika)
    {
        var users = await userRepository.GetMembersAsync(wartoscUzytkownika);
        Response.DodajPaginacjeNaglowka(users);
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
        if(user.Zdjecia.Count == 0) photo.Glownezdj =true;

        user.Zdjecia.Add(photo);
        if (await userRepository.ZapiszWszystkieAsync()) 
        return CreatedAtAction(nameof(GetUser), new {username = user.UserName}, mapper.Map<ZdjecieDto>(photo));
        return BadRequest("Problem z dodaniem zdjecia");
    }
    [HttpPut("ustaw-glowne-zdjecie/{photoId:int}")]
     public async Task<ActionResult> ustawGlowneZdjecie(int photoId)
     {
        var user = await userRepository.GetUserByUsernameAsync(User.GetUsername());
        if (user ==null) return BadRequest("nie mozna znalezc uzytkownika");
        var zdjecie = user.Zdjecia.FirstOrDefault(a => a.Id == photoId);
        if(zdjecie == null || zdjecie.Glownezdj) return BadRequest("Nie mozna uzyc jako głowne zdjęcie");
        var PoprawneGlowne = user.Zdjecia.FirstOrDefault(a => a.Glownezdj);
        if(PoprawneGlowne != null) PoprawneGlowne.Glownezdj = false;
        zdjecie.Glownezdj = true;
        if(await userRepository.ZapiszWszystkieAsync()) return NoContent();
        return BadRequest("Problem z ustawieniem Głownego zdjecia");
     }

     [HttpDelete("usun-zdjecie/{photoId:int}")]
     public async Task<ActionResult> UsunZdjecie(int photoId){
        var user = await userRepository.GetUserByUsernameAsync(User.GetUsername());
        if(user == null) return BadRequest("Uzytkownik nie został znaleziony");
        var zdjecie = user.Zdjecia.FirstOrDefault(b => b.Id == photoId);
        if (zdjecie == null || zdjecie.Glownezdj) return BadRequest("To zdjecie nie moze zostać usunięte");
        if(zdjecie.PublicId != null)
        {
            var rezultat = await dodawanieZdjecia.DeleteZdjecieAsync(zdjecie.PublicId);
            if (rezultat.Error != null) return BadRequest(rezultat.Error.Message);
        }
        user.Zdjecia.Remove(zdjecie);
        if(await userRepository.ZapiszWszystkieAsync()) return Ok();
        return BadRequest("Problem z usunieciem zdjęcia");
     }
}
