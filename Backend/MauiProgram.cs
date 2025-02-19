﻿using Backend.Dtos;
using Backend.Services;
using Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using CommunityToolkit.Maui;
using CommunityToolkit.Maui.Storage;

namespace Backend;
public static class MauiProgram
{
	public static MauiApp CreateMauiApp()
	{
		var builder = MauiApp.CreateBuilder();
		builder
			.UseMauiApp<App>()
			.UseMauiCommunityToolkit()
			.ConfigureFonts(fonts => fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular"));

		builder.Services.AddSingleton(FolderPicker.Default);

		builder.Services.AddMauiBlazorWebView();

#if DEBUG
		builder.Services.AddBlazorWebViewDeveloperTools();
		builder.Logging.AddDebug();
#endif

		RegisterServices(builder.Services);
		var app = builder.Build();
		ApplyMigration(app);
		AppSettings.Initialize(app.Services);
		return app;
	}

	private static void RegisterServices(IServiceCollection serviceCollection)
	{
		serviceCollection.AddDbContext<AppDbContext>();
		serviceCollection.AddSingleton<IDeviceInfoService, DeviceInfoService>();
		serviceCollection.AddSingleton<IContactService, ContactService>();
		serviceCollection.AddSingleton<IErrorHandler, ErrorHandler>();
		serviceCollection.AddScoped<INodeService, NodeService>();
		//serviceCollection.AddScoped<IReadRepository, ReadRepository>();
		serviceCollection.AddScoped(typeof(IRepository<>), typeof(Repository<>));
		serviceCollection.AddScoped(typeof(IPersonRepository), typeof(PersonRepository));
	}

	private static void ApplyMigration(MauiApp app)
	{
		using var scope = app.Services.CreateScope();
		var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
		//TODO Do it in background
		try
		{
			//dbContext.Database.EnsureCreated();
			dbContext.Database.Migrate();
		}
		catch (Exception e)
		{
			Console.WriteLine(e);
			Console.WriteLine(dbContext.DbPath);
			throw;
		}
	}
}