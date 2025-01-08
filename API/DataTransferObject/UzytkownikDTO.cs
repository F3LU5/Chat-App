using System;

namespace API.DataTransferObject;

public class UzytkownikDTO
{
    public required string Username { get; set; }
    public required string Onas { get; set; }
    public required string Token { get; set; }
    public string? ZdjecieUrl { get; set; }
}
