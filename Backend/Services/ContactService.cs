using Backend.Dtos;

namespace Backend.Services;

interface IContactService
{
	Task<string[]> GetContactsAsync();
	Task AddContact(PersonDto person);
	Task DialPhoneNumber(string phoneNumber);
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

	public async Task AddContact(PersonDto person)
	{
		var status = await Permissions.CheckStatusAsync<Permissions.ContactsWrite>();
		if (status is not (PermissionStatus.Granted or PermissionStatus.Limited))
		{
			status = await Permissions.RequestAsync<Permissions.ContactsWrite>();
		}
		if (status is not (PermissionStatus.Granted or PermissionStatus.Limited)) return;

		var service = DependencyService.Get<IPlatformCommunicationService>();
		service.AddContact(person.Map());
	}

	public Task DialPhoneNumber(string phoneNumber)
	{
		var service = DependencyService.Get<IPlatformCommunicationService>();
		service.DialPhoneNumber(phoneNumber);
		return Task.CompletedTask;
	}

	
}