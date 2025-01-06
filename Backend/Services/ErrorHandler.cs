namespace Backend.Services;

internal interface IErrorHandler
{
	Task Handle(Exception exception);
}

internal class ErrorHandler() : IErrorHandler
{
	public Task Handle(Exception exception)
	{
		return AppSettings.ErrorHandler(exception);
	}
}