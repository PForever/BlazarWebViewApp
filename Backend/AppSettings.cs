namespace ContactsBase;

public static class AppSettings
{
	private static IServiceProvider? _services;

	public static void Inizialize(IServiceProvider services)
	{
		_services = services;
	}
	public static T Resolve<T>() where T : notnull => _services.GetRequiredService<T>();
}
