using System;
using API.Data;
using API.Interfaces;
using API.Help;
using API.SignalR;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class AppExtentions
{
    public static IServiceCollection AddAppExtentions(this IServiceCollection services, IConfiguration config)
    {
        services.AddControllers();
        services.AddDbContext<DataContext>(opt =>
        {
            opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
        });

        services.AddCors();
        services.AddScoped<TokenServices, TokenService>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<AddingImagesService, ImageService>();
        services.AddScoped<IMessageRepo, MessageRepo>();
        services.AddScoped<UserLogoActive>();
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
        services.AddSignalR();
        services.AddSingleton<PresenceHub>();
        services.AddSingleton<PresenceTracker>();

        return services;
    }
}
