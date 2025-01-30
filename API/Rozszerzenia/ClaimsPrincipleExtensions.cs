using System;
using System.Security.Claims;

namespace API.Rozszerzenia;

public static class ClaimsPrincipleExtensions
{
    public static string GetUsername(this ClaimsPrincipal user)
    {
        var username = user.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception ("Nie mozna pobrac username z tokenu");
        return username;
    }
}
