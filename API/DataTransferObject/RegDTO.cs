using System;
using System.ComponentModel.DataAnnotations;

namespace API.DataTransferObject;

public class RegDTO
{
    [Required]
    [MaxLength(100)]
    public required string UserName { get; set; }
    [Required]
    public required string Password { get; set; }
}
