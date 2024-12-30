using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.Runtime.CompilerServices;

namespace ContactsBase;
public static class MauiProgram
{
	public static MauiApp CreateMauiApp()
	{
		var builder = MauiApp.CreateBuilder();
		builder
			.UseMauiApp<App>()
			.ConfigureFonts(fonts =>
			{
				fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
			});

		builder.Services.AddMauiBlazorWebView();

#if DEBUG
		builder.Services.AddBlazorWebViewDeveloperTools();
		builder.Logging.AddDebug();
#endif

		RegisterServices(builder.Services);

		var app = builder.Build();
		AppSettings.Inizialize(app.Services);
		return app;
	}

	private static void RegisterServices(IServiceCollection serviceCollection)
	{
		serviceCollection.AddSingleton<IDeviceInfoService, DeviceInfoService>();
		serviceCollection.AddSingleton<IContactService, ContactService>();
	}
}