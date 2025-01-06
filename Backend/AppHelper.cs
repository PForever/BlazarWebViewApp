namespace Backend;

public static class AppHelper
{
	public static AppWorker<T> Use<T>() where T : class => new();
}