using Backend.Services;
using Backend;
using Backend.Dtos;
using CommunityToolkit.Maui.Storage;
using Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.JSInterop;
using Shared;
using Application = Microsoft.Maui.Controls.Application;
using Microsoft.Maui.Controls.PlatformConfiguration.AndroidSpecific;

namespace Backend;

public partial class App : Application
{
	private readonly IFolderPicker _folderPicker;
	private static MainPage? _mainPage;

	public App(IFolderPicker folderPicker)
	{
		_folderPicker = folderPicker;
		InitializeComponent();
		Current?.On<Microsoft.Maui.Controls.PlatformConfiguration.Android>().UseWindowSoftInputModeAdjust(WindowSoftInputModeAdjust.Resize);
	}


	protected override Window CreateWindow(IActivationState? activationState)
	{
		var mainPage = _mainPage = new MainPage(_folderPicker);
		var window = new Window(mainPage);
		AppSettings.AddErrorHandler(mainPage.InvokeJs);
		return window;
	}

	[JSInvokable]
	public static async ValueTask<string?> GetDataBasePath()
	{
		if (_mainPage is null) throw new NotSupportedException("MainPage must be not null"); 
		var result = await _mainPage.PickFolderAsync();
		return result;
	}

	[JSInvokable]
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


	[JSInvokable]
	public static Task DialPhoneNumber(string number) => AppHelper.Use<IContactService>().Do(s => s.DialPhoneNumber(number));
	//Repositories
	//Person
	[JSInvokable]
	public static async Task<PersonDto?> GetPerson(int id) =>
		await AppHelper.Use<IPersonRepository>().Do(s => s.Get(id).When(r => r?.Map()));

	[JSInvokable]
	public static async Task<IReadOnlyCollection<PersonDto>> GetPeople() =>
		await AppHelper.Use<IPersonRepository>().Do(s => s.GetAll().Select(p => p.Map()).ToListAsync());

	[JSInvokable]
	public static async Task<PersonDto> UpdatePerson(PersonDto person)
	{
		await AppHelper.Use<IPersonRepository>().Do(s => s.Update(person.Map()));
		return person;
	}

	[JSInvokable]
	public static async Task<int> AddPerson(PersonDto person)
	{
		var result = await AppHelper.Use<IPersonRepository>().Do(s => s.Add(person.Map()));
		await AppHelper.Use<IContactService>().Do(s => s.AddContact(person));
		return result;
	}

	[JSInvokable]
	public static Task DeletePerson(int id) => AppHelper.Use<IPersonRepository>().Do(s => s.Delete(id));

	//EventType

	[JSInvokable]
	public static async Task<IReadOnlyCollection<EventTypeDto>> GetEventTypes()
	{
		var t = await AppHelper.Use<IRepository<EventType>>().Do(s => s.GetAll().Select(p => p.Map()).ToListAsync());
		return t;
	}


}