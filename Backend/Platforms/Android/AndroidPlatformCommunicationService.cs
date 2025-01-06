using Android.Content;
using Android.Provider;
using Backend;
using Backend.Services;
using Contacts = Microsoft.Maui.ApplicationModel.Communication.Contacts;

[assembly: Dependency(typeof(ContactService))]

namespace Backend;

public class AndroidPlatformCommunicationService : IPlatformCommunicationService
{
	public async Task<string[]> GetContactsAsync()
	{
		var contacts = (await Contacts.Default.GetAllAsync()).ToArray();
		
		var result = contacts
			.Select(c => (Date: GetContactCreationDate(c.Id), c.DisplayName, c.Phones.FirstOrDefault()?.PhoneNumber))
			.OrderBy(c => c.Date)
			.Select(c => $"{c.Date}\t{c.PhoneNumber}\t{c.DisplayName}")
			.ToArray();
		return result;
	}

	public static DateTime? GetContactCreationDate(string contactId)
	{

		var uri = ContactsContract.Contacts.ContentUri;
		var projection = new[] { ContactsContract.IContactsColumns.ContactLastUpdatedTimestamp };
		var selection = $"{ ContactsContract.IContactsColumns.NameRawContactId} = ?";
		var selectionArgs = new[] { contactId };

		if (uri == null) return null;
		using var cursor = Android.App.Application.Context.ContentResolver?.Query(uri, projection, selection, selectionArgs, null);
		if (cursor != null && cursor.MoveToFirst())
		{
			var timestamp = cursor.GetLong(cursor.GetColumnIndex(ContactsContract.IContactsColumns.ContactLastUpdatedTimestamp));
			return DateTimeOffset.FromUnixTimeMilliseconds(timestamp).DateTime;
		}
		return null;
	}
}