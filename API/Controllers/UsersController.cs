using System.Security.Claims;
using API.DataTransferObject;
using API.Entities;
using API.Interfaces;
using API.Help;
using API.Extensions;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
[Authorize]
public class UsersController(IUserRepository userRepository, IMapper mapper, AddingImagesService addingImages) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers([FromQuery]UserValue userValue)
    {
        var users = await userRepository.GetMembersAsync(userValue);
        Response.AddHeaderPagination(users);
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
    public async Task<ActionResult> UpdateUser(MemberUpdateDTO memberUpdateDTO)
    {

        var user = await userRepository.GetUserByUsernameAsync(User.GetUsername());
        if(user == null) return BadRequest("Nie można znaleźć użytkownika");
        mapper.Map(memberUpdateDTO, user);

        if(await userRepository.SaveAllAsync()) return NoContent();
        return BadRequest("Nie udało się zaktualizowac użytkownika");
    }

    [HttpPost("add-photo")]
    public async Task<ActionResult<ImageDto>> AddPhoto(IFormFile file)
    {
        var user = await userRepository.GetUserByUsernameAsync(User.GetUsername());
        if(user == null) return BadRequest("Nie mozna zaktualizowac uzytkownika");
        var result = await addingImages.AddPhotoAsync(file);

        if(result.Error != null) return BadRequest(result.Error.Message);

        var photo = new Image
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId
        };
        if(user.Images.Count == 0) photo.MainImage =true;

        user.Images.Add(photo);
        if (await userRepository.SaveAllAsync()) 
        return CreatedAtAction(nameof(GetUser), new {username = user.UserName}, mapper.Map<ImageDto>(photo));
        return BadRequest("Problem z dodaniem profileImages");
    }
    [HttpPut("ustaw-glowne-zdjecie/{photoId:int}")]
     public async Task<ActionResult> setMainImage(int photoId)
     {
        var user = await userRepository.GetUserByUsernameAsync(User.GetUsername());
        if (user ==null) return BadRequest("nie mozna znalezc uzytkownika");
        var image = user.Images.FirstOrDefault(a => a.Id == photoId);
        if(image == null || image.MainImage) return BadRequest("Nie mozna uzyc jako głowne zdjęcie");
        var CorrectMain = user.Images.FirstOrDefault(a => a.MainImage);
        if(CorrectMain != null) CorrectMain.MainImage = false;
        image.MainImage = true;
        if(await userRepository.SaveAllAsync()) return NoContent();
        return BadRequest("Problem z ustawieniem Głownego profileImages");
     }

     [HttpDelete("usun-zdjecie/{photoId:int}")]
     public async Task<ActionResult> DeleteImage(int photoId){
        var user = await userRepository.GetUserByUsernameAsync(User.GetUsername());
        if(user == null) return BadRequest("Member nie został znaleziony");
        var image = user.Images.FirstOrDefault(b => b.Id == photoId);
        if (image == null || image.MainImage) return BadRequest("To zdjecie nie moze zostać usunięte");
        if(image.PublicId != null)
        {
            var rezultat = await addingImages.DeleteImageAsync(image.PublicId);
            if (rezultat.Error != null) return BadRequest(rezultat.Error.Message);
        }
        user.Images.Remove(image);
        if(await userRepository.SaveAllAsync()) return Ok();
        return BadRequest("Problem z usunieciem zdjęcia");
     }
}
