using System;
using API.Entities;

namespace API.Interfejsy;

public interface UslugiToken
{
    string StworzToken(AppUser user);
}
