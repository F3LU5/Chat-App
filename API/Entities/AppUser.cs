using System;
using API.Rozszerzenia;

namespace API.Entities;

public class AppUser
{
    public int Id { get; set; }
    public required string UserName { get; set; }

    public byte[] hashaslo { get; set; } = [];
    public byte[] salthaslo { get; set; } = [];
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
    // public int GetWiek(){
    //     return DataUrodzenia.ObliczWiek();
    // }
}
