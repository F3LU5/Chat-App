using System;
using API.Rozszerzenia;
using API.Uslugi;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Pomoc;

public class LogoUzytkownikaAktywny : IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var resultContext = await next();
        if(context.HttpContext.User.Identity?.IsAuthenticated != true) return;
        var username = resultContext.HttpContext.User.GetUsername();
        var repo = resultContext.HttpContext.RequestServices.GetRequiredService<IUserRepository>();
        var user = await repo.GetUserByUsernameAsync(username);
        if(user == null) return;
        user.OstatniaAktywnosc = DateTime.UtcNow;
        await repo.ZapiszWszystkieAsync();
    }
}
