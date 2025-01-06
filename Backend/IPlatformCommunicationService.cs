namespace Backend;

interface IPlatformCommunicationService
{
	public Task<string[]> GetContactsAsync();
}