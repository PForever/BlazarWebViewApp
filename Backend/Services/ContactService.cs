namespace Backend.Services;

interface IContactService
{
	Task<string[]> GetContactsAsync();
}

class ContactService : IContactService
{
	public async Task<string[]> GetContactsAsync()
	{
		var status = await Permissions.CheckStatusAsync<Permissions.ContactsRead>();
		if (status is not (PermissionStatus.Granted or PermissionStatus.Limited))
		{
			status = await Permissions.RequestAsync<Permissions.ContactsRead>();
		}
		if (status is not (PermissionStatus.Granted or PermissionStatus.Limited)) return [];
		var contscts = await DependencyService.Get<IPlatformCommunicationService>().GetContactsAsync();
		return contscts;
	}
}