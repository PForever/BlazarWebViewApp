using Microsoft.JSInterop;
using System.Diagnostics;

namespace ContactsBase;

public partial class App : Application
{
	public App()
	{
		InitializeComponent();

		MainPage = new MainPage();
	}
	[JSInvokable]
	public static string GetDeviceInfo() => AppSettings.Resolve<IDeviceInfoService>().GetDeviceInfo();
	[JSInvokable]
	public static Task<string> GetDelay() => AppSettings.Resolve<IDeviceInfoService>().GetDelay();
	[JSInvokable]
	public static Task<string[]> GetContacts() => AppSettings.Resolve<IContactService>().GetContactsAsync();
}
