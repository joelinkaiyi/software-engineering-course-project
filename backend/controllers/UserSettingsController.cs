using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserSettingsController : ControllerBase
{
    private static UserSettings _settings = new UserSettings();

    [HttpGet]
    public ActionResult<UserSettings> GetSettings()
    {
        return Ok(_settings);
    }

    [HttpPost]
    public ActionResult UpdateSettings([FromBody] UserSettings newSettings)
    {
        _settings = newSettings;
        return Ok();
    }
}
