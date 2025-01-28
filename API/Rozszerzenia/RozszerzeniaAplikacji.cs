using System;
using API.Data;
using API.Interfejsy;
using API.Pomoc;
using API.SignalR;
using API.Uslugi;
using Microsoft.EntityFrameworkCore;

namespace API.Rozszerzenia;

public static class RozszerzeniaAplikacji
{
    public static IServiceCollection AddRozszerzeniaAplikacji(this IServiceCollection services, IConfiguration config)
    {
        services.AddControllers();
        services.AddDbContext<DataContext>(opt =>
        {
            opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
        });

        services.AddCors();
        services.AddScoped<UslugiToken, TokenService>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<DodawanieZdjeciaService, ZdjecieService>();
        services.AddScoped<IMessageRepo, MessageRepo>();
        services.AddScoped<LogoUzytkownikaAktywny>();
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
        services.AddSignalR();
        services.AddSingleton<PresenceHub>();
        services.AddSingleton<PresenceTracker>();

        return services;
    }
}
