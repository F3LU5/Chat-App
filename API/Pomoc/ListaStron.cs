using System;
using Microsoft.EntityFrameworkCore;

namespace API.Pomoc;

public class ListaStron<T> : List<T>
{
   public ListaStron(IEnumerable<T> items, int count, int pageNumber, int pageSize)
{
    CurrentPage = pageNumber;
    TotalCount = (int)Math.Ceiling(count / (double)pageSize); // Oblicz liczbę stron
    PageSize = pageSize;
    TotalCount = count; // Przypisz rzeczywistą liczbę elementów
    AddRange(items); // Dodaj elementy do listy
}

    public int CurrentPage { get; set; }
    public int TotalPages { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
    public static async Task<ListaStron<T>> StworzAsync(IQueryable<T> source, int pageNumber, int pageSize)
{
    var count = await source.CountAsync();
    var items = await source.Skip((pageNumber-1) * pageSize).Take(pageSize).ToListAsync();
    Console.WriteLine($"PageNumber: {pageNumber}, PageSize: {pageSize}, TotalCount: {count}");
    return new ListaStron<T>(items, count, pageNumber, pageSize);
}

}
