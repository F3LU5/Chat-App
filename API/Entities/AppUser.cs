using System;

namespace API.Entities;

public class AppUser
{
    public int Id { get; set; }
    public required string UserName { get; set; }

    public required byte[] hashaslo { get; set; }
    public required byte[] salthaslo { get; set; }
}
