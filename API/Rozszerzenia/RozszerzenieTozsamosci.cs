using System;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace API.Rozszerzenia;

public static class RozszerzenieTozsamosci
{
    public static IServiceCollection AddRozszerzonaTozsamosc(this IServiceCollection services, IConfiguration config)
    {
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opions =>
{
    var kluczTokenu = config["kluczTokenu"] ?? throw new Exception("KluczTokenu nie zostął znaleziony");
    opions.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(kluczTokenu)),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});
return services;
    }
}
