using System;

namespace API.Pomoc;

public class MessagePar : WartoscUzytkownika
{
    public string? Username { get; set; }
    public string Container { get; set; } = "Unread";
}
