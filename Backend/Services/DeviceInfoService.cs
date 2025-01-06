using System.Diagnostics;

namespace Backend.Services;

interface IDeviceInfoService { Task<string> GetDelay(); string GetDeviceInfo(); }
class DeviceInfoService : IDeviceInfoService
{
	public string GetDeviceInfo()
	{
		Debug.WriteLine("INVOKED");
		string deviceDetails = "Device Name: " + DeviceInfo.Name + " | Orientation: " + DeviceDisplay.MainDisplayInfo.Orientation;
		Debug.WriteLine(deviceDetails);
		return deviceDetails;
	}
	public async Task<string> GetDelay()
	{
		await Task.Delay(5000);
		return "succed";
	}
}