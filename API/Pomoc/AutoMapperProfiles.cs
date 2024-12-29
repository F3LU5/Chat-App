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
    }
}
