using System;

namespace API.DataTransferObject;

public class UserDTO
{
    public required string Username { get; set; }
    public required string Initials { get; set; }
    public required string Token { get; set; }
    public string? ImageUrl { get; set; }
}
