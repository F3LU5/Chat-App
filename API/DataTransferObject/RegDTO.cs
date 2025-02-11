using System;
using System.ComponentModel.DataAnnotations;

namespace API.DataTransferObject;

public class RegDTO
{
    [Required]
    
    public string UserName { get; set; } = string.Empty;

    [Required] public string? Initials {get; set;}
    [Required] 
    [DataType(DataType.Date)]
    public string? DateOfBirth {get; set;}
    [Required] public string? Gender {get; set;}
    [Required]  public long? PhoneNumber {get; set;}
    [Required] public string? Profession {get; set;}
    

    [Required]
    [StringLength(16, MinimumLength = 4)]
    public string Password { get; set; } = string.Empty;
}
