using System;
using API.DataTransferObject;
using API.Entities;
using API.Rozszerzenia;
using AutoMapper;

namespace API.Pomoc;

public class AutoMapperProfiles: Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<AppUser, MemberDTO>()
        .ForMember(a => a.Wiek, b => b.MapFrom(c => c.DataUrodzenia.ObliczWiek()))
        .ForMember(a => a.ZdjecieUrl, b => b.MapFrom(c => c.Zdjecia.FirstOrDefault(d => d.Glownezdj)!.Url));
        CreateMap<Zdjecie, ZdjecieDto>();
        CreateMap<AktualizacjaCzlonkaDTO, AppUser>();
        CreateMap<RegDTO, AppUser>();
        CreateMap<string, DateOnly>().ConstructUsing(s => DateOnly.Parse(s));
        CreateMap<Message, MessageDTO>()
        .ForMember(d => d.SenderPhotoUrl, o => o.MapFrom(s => s.Sender.Zdjecia.FirstOrDefault(x => x.Glownezdj)!.Url))
        .ForMember(d => d.RecipientPhotoUrl, o => o.MapFrom(s => s.Recipient.Zdjecia.FirstOrDefault(x => x.Glownezdj)!.Url));
    }
}
