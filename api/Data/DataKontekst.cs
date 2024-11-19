using System;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public class DataKontekst : DbContext
{
    public DataKontekst(DbContextOptions options) : base(options)
    {
    }
}
