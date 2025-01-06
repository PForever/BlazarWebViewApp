using Backend.Services;
using System.Runtime.CompilerServices;

namespace Backend;

public class AppWorker<T> where T : class
{
	private readonly IServiceProvider _provider = AppSettings.Services ?? throw new InvalidOperationException();

	private async Task HandleError(Exception e)
	{
		Console.WriteLine(e);
		try
		{
			var service = _provider.GetRequiredService<IErrorHandler>();
			await service.Handle(e);

		}
		catch (Exception exception)
		{
			Console.WriteLine($"Error handling failed: {exception}");
			throw;
		}
	}
	public async Task<TResult> Do<TResult>(Func<T, Task<TResult>> action)
	{
		try
		{
			await using var scope = _provider.CreateAsyncScope();
			var service = scope.ServiceProvider.GetRequiredService<T>();
			return await action(service);
		}
		catch (Exception e)
		{
			await HandleError(e);
			throw;
		}
	}
	public async Task Do(Func<T, Task> action)
	{
		try
		{
			var provider = AppSettings.Services ?? throw new InvalidOperationException();
			await using var scope = provider.CreateAsyncScope();
			var service = scope.ServiceProvider.GetRequiredService<T>();
			await action(service);
		}
		catch (Exception e)
		{
			await HandleError(e);
			throw;
		}
	}
	[OverloadResolutionPriority(1)]
	public async ValueTask<TResult> Do<TResult>(Func<T, ValueTask<TResult>> action)
	{
		try
		{
			var provider = AppSettings.Services ?? throw new InvalidOperationException();
			await using var scope = provider.CreateAsyncScope();
			var service = scope.ServiceProvider.GetRequiredService<T>();
			return await action(service);
		}
		catch (Exception e)
		{
			await HandleError(e);
			throw;
		}
	}
}