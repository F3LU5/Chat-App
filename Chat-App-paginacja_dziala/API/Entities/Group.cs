using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class Group
{
    [Key]
    public required string Name { get; set; }
    public ICollection<Polaczenie> Polaczenia { get; set; } = [];
}
