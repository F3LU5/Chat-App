using System;
using API.Entities;

namespace API.Interfejsy;

public interface UslugiToken
{
    Task<string> StworzToken(AppUser user);
}
