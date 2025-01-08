using System;

namespace API.Entities;

public class Message
{
    public int Id { get; set; }
    public string Nadawca { get; set; }
    public string Odbiorca { get; set; }
    public string Content { get; set; }
    public DateTime? DateRead { get; set; }
    public DateTime MessageSent { get; set; } = DateTime.UtcNow;
    public bool SenderDeleted { get; set; }


}
