using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfejsy;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Uslugi;

public class TokenService(IConfiguration configuration, UserManager<AppUser>userManager) : UslugiToken
{
    public async Task<string> StworzToken(AppUser user){
        var kluczTokenu = configuration["KluczTokenu"]?? throw new Exception("Nie można uzyskać dostępu do KluczaTokenu z appsettings");
        if (kluczTokenu.Length < 64) throw new Exception("Twój KluczTokenu musi być dłuższy");
        var klucz = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(kluczTokenu));

        if(user.UserName == null) throw new Exception("Nie ma nazwy uzytkownika tego uzytkownika");

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.UserName)
        };

        var roles = await userManager.GetRolesAsync(user);

        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

        var creds = new SigningCredentials(klucz, SecurityAlgorithms.HmacSha256Signature);
        var opisTokenu = new SecurityTokenDescriptor{
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = creds
        };
        var tokenHandle = new JwtSecurityTokenHandler();
        var token = tokenHandle.CreateToken(opisTokenu);
        return tokenHandle.WriteToken(token);
    }
}
