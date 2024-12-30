using Android.App;
using Android.Runtime;

namespace ContactsBase;
[Application]
public class MainApplication : MauiApplication
{
	public MainApplication(IntPtr handle, JniHandleOwnership ownership)
		: base(handle, ownership)
	{
	}

	protected override MauiApp CreateMauiApp()
	{
		DependencyService.Register<IPlatformService, AndroidPlatformService>();
		return MauiProgram.CreateMauiApp();
	}
}
