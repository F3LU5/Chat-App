using System;
using API.Interfejsy;
using API.Pomoc;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace API.Uslugi;

public class ZdjecieService : DodawanieZdjeciaService
{
    private readonly Cloudinary _cloudinary;
    public ZdjecieService(IOptions<CloudinarySettings> config)
    {
        var acc = new Account(config.Value.CloudName, config.Value.ApiKey, config.Value.ApiSecret);
        _cloudinary = new Cloudinary(acc);
    }
    public async Task<ImageUploadResult> AddZdjecieAsync(IFormFile file)
    {
        var uploadResult = new ImageUploadResult();
        if(file.Length > 0)
        {
            using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face"),
                Folder = "zdjuzytkownikow"
            };
            uploadResult =await _cloudinary.UploadAsync(uploadParams);
            
        }
        return uploadResult;
    }

    public async Task<DeletionResult> DeleteZdjecieAsync(string publicId)
    {
        var deleteParams = new DeletionParams(publicId);
        return await _cloudinary.DestroyAsync(deleteParams);
    }
}
