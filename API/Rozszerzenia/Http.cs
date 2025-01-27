using System;
using System.Text.Json;
using API.Pomoc;

namespace API.Rozszerzenia;

public static class Http
{
    public static void DodajPaginacjeNaglowka<T>(this HttpResponse response, ListaStron<T> data){
        var naglowekPaginacji = new NaglowekPaginacji(data.CurrentPage, data.PageSize, data.TotalCount, data.TotalPages);
        var Opcjejn = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        response.Headers.Append("Pagination", JsonSerializer.Serialize(naglowekPaginacji,Opcjejn));
        response.Headers.Append("Access-Control-Expose-Headers","Pagination");
    }
}