using System;

namespace API.DataTransferObject;

public class LoginDTO
{
    public required string UserName { get; set; }
    public required string Password { get; set; }
}
