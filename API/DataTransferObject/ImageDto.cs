namespace API.DataTransferObject;

public class ImageDto
{
    public int Id { get; set; }
    public string? Url { get; set; }
    public bool MainImage { get; set; }
}