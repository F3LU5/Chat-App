using System;
using API.Pomoc;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ServiceFilter(typeof(LogoUzytkownikaAktywny))]
[ApiController]
[Route("api/[controller]")]
public class BaseApiController : ControllerBase
{

}
