using System;

namespace API.DataTransferObject;

public class MemberUpdateDTO
{
    public string? Description { get; set; }
    public string? JobDescription { get; set; }
    public string? Profession { get; set; }
    public string? PhoneNumber { get; set; }
}
