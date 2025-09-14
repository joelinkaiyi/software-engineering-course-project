namespace backend.Models;

public class UserSettings
{
    public int Id { get; set; }
    public int RefreshInterval { get; set; } = 60; // 預設 60 秒
    public string NotificationMethod { get; set; } = "Browser"; // Browser / Email
    public List<string> TrackStatuses { get; set; } = new(); // ["準時","延誤","取消"]
}
