using System;

namespace API.DataTransferObject;

public class TworzenieWiadomosciDTO
{
    public required string NazwaOdbiorcy { get; set; }
    public required string Content { get; set; }
}
