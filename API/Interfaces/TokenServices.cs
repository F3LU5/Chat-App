using System;
using API.Entities;

namespace API.Interfaces;

public interface TokenServices
{
    Task<string> CreateToken(AppUser user);
}
