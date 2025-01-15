using System;
using CloudinaryDotNet.Actions;

namespace API.Interfejsy;

public interface DodawanieZdjeciaService
{
    Task<ImageUploadResult> AddZdjecieAsync(IFormFile file);
    Task<DeletionResult> DeleteZdjecieAsync(string publicId);
}
