using System.Diagnostics;
using Microsoft.Maui.ApplicationModel.Communication;

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

interface IContactService
{
	Task<string[]> GetContactsAsync();
}

class ContactService : IContactService
{
	public async Task<string[]> GetContactsAsync()
	{
		var status = await Permissions.CheckStatusAsync<Permissions.ContactsRead>();
		if (status is not (PermissionStatus.Granted or PermissionStatus.Limited))
		{
			status = await Permissions.RequestAsync<Permissions.ContactsRead>();
		}
		if (status is not (PermissionStatus.Granted or PermissionStatus.Limited)) return [];
		var contscts = await DependencyService.Get<IPlatformService>().GetContactsAsync();
		return contscts;
	}
}

interface IPlatformService
{
	public Task<string[]> GetContactsAsync();
}
