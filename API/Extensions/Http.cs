using System;
using System.Text.Json;
using API.Help;

namespace API.Extensions;

public static class Http
{
    public static void AddHeaderPagination<T>(this HttpResponse response, PageList<T> data){
        var paginationHeader = new PaginationHeader(data.CurrentPage, data.PageSize, data.TotalCount, data.TotalPages);
        var JnOptions = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        response.Headers.Append("Pagination", JsonSerializer.Serialize(paginationHeader,JnOptions));
        response.Headers.Append("Access-Control-Expose-Headers","Pagination");
    }
}