using System;
using API.Rozszerzenia;
using Microsoft.AspNetCore.Identity;

namespace API.Entities;

public class AppUser : IdentityUser<int>
{
    public DateOnly DataUrodzenia { get; set; }
    public required string Onas { get; set; }
    public DateTime Stworzone { get; set; } = DateTime.UtcNow;
    public DateTime OstatniaAktywnosc { get; set; } = DateTime.UtcNow;
    public required string Plec { get; set; }
    public string? Wstep { get; set; }
    public required string Miasto { get; set; }
    public required string Kraj { get; set; }
    public List<Zdjecie> Zdjecia { get; set; } = [];
    public List<Message> MessagesSent { get; set; } = [];
    public List<Message> MessagesReceived { get; set; } = [];
    public ICollection<AppUserRole> UserRoles { get; set; } = [];

}
