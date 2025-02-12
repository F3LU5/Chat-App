using System;
using API.Help;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ServiceFilter(typeof(UserLogoActive))]
[ApiController]
[Route("api/[controller]")]
public class BaseApiController : ControllerBase
{

}
