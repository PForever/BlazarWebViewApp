using Backend.Services;
using Backend;
using Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.JSInterop;

namespace Backend;

public partial class App : Application
{
	public App() { InitializeComponent(); }


	protected override Window CreateWindow(IActivationState? activationState)
	{
		var mainPage = new MainPage();
		var window = new Window(mainPage);
		AppSettings.AddErrorHandler(mainPage.InvokeJs);
		return window;
	}

	[JSInvokable]
	//public static string GetDeviceInfo() => AppSettings.Resolve<IDeviceInfoService>().GetDeviceInfo();
	public static async ValueTask<string> GetDeviceInfo()
	{
		await AppHelper.Use<IRepository<Note>>().Do(async r =>
		{
			var result = await r.Get(200);
			return result ?? throw new Exception("wrong data");
		});
		return AppSettings.Resolve<IDeviceInfoService>().GetDeviceInfo();
	}

	[JSInvokable]
	public static Task<string> GetDelay() => AppSettings.Resolve<IDeviceInfoService>().GetDelay();
	[JSInvokable]
	public static Task<string[]> GetContacts() => AppSettings.Resolve<IContactService>().GetContactsAsync();
	[JSInvokable]
	public static async Task<Note> AddNote(string? name, string? value) =>
		await AppHelper.Use<INodeService>().Do(s => s.AddNode(name, value ?? "", default));

	[JSInvokable]
	public static Task<IReadOnlyCollection<Note>> GetNotes() =>
		AppHelper.Use<INodeService>().Do(s => s.GetAll(default));

	//Repositories
	//Person
	[JSInvokable]
	public static Task<Person?> GetPerson(int id) => AppHelper.Use<IRepository<Person>>().Do(s => s.Get(id));

	//[JSInvokable]
	//public static ValueTask<object?> GetDbRow(string tableName, int id) =>
	//	AppHelper.Do(s => s.GetRequiredService<IReadRepository>(), r => r.Get(tableName, id));
	//[JSInvokable]
	//public static async Task<IReadOnlyCollection<object?>> GetDbRows(string tableName)
	//{
	//	var list = await AppHelper.Do(s => s.GetRequiredService<IReadRepository>(), r => r.GetAll(tableName).ToListAsync());
	//	return list;
	//}

	//[JSInvokable]
	//public static Task AddDbRow<T>(T value) where T : class =>
	//	AppHelper.Do(s => s.GetRequiredService<IRepository<T>>(), r => r.Add(value).Commit());
	//[JSInvokable]
	//public static Task DeleteDbRow<T>(T value) where T : class =>
	//	AppHelper.Do(s => s.GetRequiredService<IRepository<T>>(), r => r.Delete(value).Commit());
	//[JSInvokable]
	//public static Task UpdateDbRow<T>(T value) where T : class =>
	//	AppHelper.Do(s => s.GetRequiredService<IRepository<T>>(), r => r.Update(value).Commit());
}