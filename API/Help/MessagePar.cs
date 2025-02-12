using System;

namespace API.Help;

public class MessagePar : UserValue
{
    public string? Username { get; set; }
    public string Container { get; set; } = "Unread";
}
