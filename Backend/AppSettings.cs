namespace Backend;

public static class AppSettings
{
	internal static IServiceProvider? Services;

	public static void Initialize(IServiceProvider services)
	{
		Services = services;
	}
	public static T Resolve<T>() where T : notnull => (Services ?? throw new InvalidOperationException()).GetRequiredService<T>();
	public static void AddErrorHandler(Func<Exception, Task> handler) => ErrorHandler = handler;

	public static Func<Exception, Task> ErrorHandler { get; private set; } = e =>
	{
		Console.WriteLine(e);
		return Task.CompletedTask;
	};
}