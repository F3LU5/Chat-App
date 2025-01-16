using System;

namespace API.DataTransferObject;

public class MemberDTO
{
    public int Id { get; set; }
    public string? Username { get; set; }
    public int Wiek { get; set; }
    public string? ZdjecieUrl { get; set; }
    public string? Onas { get; set; }
    public DateTime Stworzone { get; set; }
    public DateTime OstatniaAktywnosc { get; set; }
    public string? Plec { get; set; }
    public string? Wstep { get; set; }
    public string? Miasto { get; set; }
    public string? Kraj { get; set; }
    public List<ZdjecieDto>? Zdjecia { get; set; }

}
