using System;
using System.ComponentModel.DataAnnotations;

namespace API.DataTransferObject;

public class RegDTO
{
    [Required]
    
    public string UserName { get; set; } = string.Empty;

    [Required] public string? Onas {get; set;}
    [Required] 
    [DataType(DataType.Date)]
    public string? DataUrodzenia {get; set;}
    [Required] public string? Plec {get; set;}
    [Required]  public string? Kraj {get; set;}
    [Required] public string? Miasto {get; set;}
    

    [Required]
    [StringLength(16, MinimumLength = 4)]
    public string Password { get; set; } = string.Empty;
}
