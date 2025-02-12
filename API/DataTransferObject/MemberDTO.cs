using System;

namespace API.DataTransferObject;

public class MemberDTO
{
    public int Id { get; set; }
    public string? Username { get; set; }
    public int Age { get; set; }
    public string? ImageUrl { get; set; }
    public string? Initials { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime LastActive { get; set; }
    public string? Gender { get; set; }
    public string? Description { get; set; }
    public string? Profession { get; set; }
    public string? PhoneNumber { get; set; }
    public List<ImageDto>? Images { get; set; }

}
