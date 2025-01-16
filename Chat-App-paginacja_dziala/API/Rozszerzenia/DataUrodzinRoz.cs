using System;

namespace API.Rozszerzenia;

public static class DataUrodzinRoz
{
    public static int ObliczWiek(this DateOnly dob){
        var dzisiaj = DateOnly.FromDateTime(DateTime.Now);
        var wiek = dzisiaj.Year - dob.Year;
        if(dob > dzisiaj.AddYears(-wiek)) wiek--;
        return wiek;
    }
}
