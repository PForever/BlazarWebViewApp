using Android.App;
using Android.Runtime;
using Backend;

namespace Backend;
[Application]
public class MainApplication : MauiApplication
{
	public MainApplication(IntPtr handle, JniHandleOwnership ownership)
		: base(handle, ownership)
	{
	}

	protected override MauiApp CreateMauiApp()
	{
		DependencyService.Register<IPlatformCommunicationService, AndroidPlatformCommunicationService>();
		return MauiProgram.CreateMauiApp();
	}
}
