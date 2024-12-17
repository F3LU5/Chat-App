using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

[Table("Zdjecia")]
public class Zdjecie
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public bool Glownezdj { get; set; }
    public string? PublicId { get; set; }

    //nawigacja

    public int AppUserId { get; set; }
    public AppUser AppUser { get; set; } = null!;
}