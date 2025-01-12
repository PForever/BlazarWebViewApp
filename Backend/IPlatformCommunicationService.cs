using Database;

namespace Backend;

interface IPlatformCommunicationService
{
	public Task<string[]> GetContactsAsync();
	public void AddContact(Person person);
	public void DialPhoneNumber(string phoneNumber);
}