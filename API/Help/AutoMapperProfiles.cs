using System;
using API.DataTransferObject;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Help;

public class AutoMapperProfiles: Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<AppUser, MemberDTO>()
        .ForMember(a => a.Age, b => b.MapFrom(c => c.DateOfBirth.CalcAge()))
        .ForMember(a => a.ImageUrl, b => b.MapFrom(c => c.Images.FirstOrDefault(d => d.MainImage)!.Url));
        CreateMap<Image, ImageDto>();
        CreateMap<MemberUpdateDTO, AppUser>();
        CreateMap<RegDTO, AppUser>();
        CreateMap<string, DateOnly>().ConstructUsing(s => DateOnly.Parse(s));
        CreateMap<Message, MessageDTO>()
        .ForMember(d => d.SenderPhotoUrl, o => o.MapFrom(s => s.Sender.Images.FirstOrDefault(x => x.MainImage)!.Url))
        .ForMember(d => d.RecipientPhotoUrl, o => o.MapFrom(s => s.Recipient.Images.FirstOrDefault(x => x.MainImage)!.Url));
        CreateMap<DateTime, DateTime>().ConvertUsing(d => DateTime.SpecifyKind(d, DateTimeKind.Utc));
        CreateMap<DateTime?, DateTime?>().ConvertUsing(d => d.HasValue 
        ? DateTime.SpecifyKind(d.Value, DateTimeKind.Utc) : null);
    }
}
