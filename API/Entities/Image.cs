using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

[Table("Images")]
public class Image
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public bool MainImage { get; set; }
    public string? PublicId { get; set; }

    //nawigacja

    public int AppUserId { get; set; }
    public AppUser AppUser { get; set; } = null!;
}