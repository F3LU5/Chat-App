using System;

namespace API.DataTransferObject;

public class CreateMessageDTO
{
    public required string RecipientUsername { get; set; }
    public required string Content { get; set; }
}
