using CommunityToolkit.Maui.Core.Primitives;
using CommunityToolkit.Maui.Storage;
using Microsoft.AspNetCore.Components.WebView.Maui;
using Microsoft.JSInterop;

namespace Backend;

public partial class MainPage : ContentPage
{
	private readonly IFolderPicker _folderPicker;

	public MainPage(IFolderPicker folderPicker)
	{
		_folderPicker = folderPicker;
		InitializeComponent();
	}

	public async Task InvokeJs(Exception e)
	{
		//blazorWebView.EvaluateJavaScriptAsync()
		var wasDispatchCalled = await blazorWebView.TryDispatchAsync(sp =>
		{
			var jsRuntime = sp.GetRequiredService<IJSRuntime>();
			Console.WriteLine(jsRuntime);
			jsRuntime.InvokeVoidAsync("handleError", e.ToString());
		});
	}

	public async Task<string?> PickFolderAsync()
	{
		var status = await Permissions.CheckStatusAsync<Permissions.StorageWrite>();
		if (status is not (PermissionStatus.Granted or PermissionStatus.Limited))
		{
			status = await Permissions.RequestAsync<Permissions.StorageWrite>();
		}
		status = await Permissions.CheckStatusAsync<Permissions.StorageRead>();
		if (status is not (PermissionStatus.Granted or PermissionStatus.Limited))
		{
			status = await Permissions.RequestAsync<Permissions.StorageRead>();
		}

		//var result = await FilePicker.PickAsync(new PickOptions
		//{
		//	PickerTitle = "Choose folder"
		//});
		var result = await _folderPicker.PickAsync();

		if (result?.Folder?.Path is { } folder)
		{
			var filePath = Path.Combine(folder, "example.txt");
			if (!File.Exists(filePath))
			{
				await File.WriteAllTextAsync(filePath, "Hello, MAUI!");
			}
			var test = await File.ReadAllTextAsync(filePath);
		}

		return result?.Folder?.Path;
	}
}
