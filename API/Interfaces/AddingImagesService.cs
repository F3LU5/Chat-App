using System;
using CloudinaryDotNet.Actions;

namespace API.Interfaces;

public interface AddingImagesService
{
    Task<ImageUploadResult> AddPhotoAsync(IFormFile file);
    Task<DeletionResult> DeleteImageAsync(string publicId);
}
