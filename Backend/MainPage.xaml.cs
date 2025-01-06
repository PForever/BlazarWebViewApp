using Microsoft.AspNetCore.Components.WebView.Maui;
using Microsoft.JSInterop;

namespace Backend;

public partial class MainPage : ContentPage
{

	public MainPage()
	{
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
}
