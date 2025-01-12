using Android.Content;
using Android.Locations;
using Android.Provider;
using Backend.Services;
using Database;
using Java.Net;
using System.Xml;
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

	public void AddContact(Person person)
	{
		var context = Android.App.Application.Context;
		var intent = new Intent(ContactsContract.Intents.Insert.Action);
		intent.SetType(ContactsContract.RawContacts.ContentType);
		intent.PutExtra(ContactsContract.Intents.Insert.Name, $"{person.FirstName} {person.LastName}");
		intent.PutExtra(ContactsContract.Intents.Insert.Phone, person.Phone);
		intent.PutExtra(ContactsContract.Intents.Insert.Notes, person.Notes);
		intent.PutExtra(ContactsContract.Intents.Insert.Postal, person.Address);
		intent.PutExtra(ContactsContract.Intents.Insert.Data, person.Id);
		intent.PutExtra("CustomUniqueId", person.Id);
		intent.AddFlags(ActivityFlags.NewTask);
		context.StartActivity(intent);
	}

	public void DialPhoneNumber(string phoneNumber)
	{
		var context = Android.App.Application.Context;
		var intent = new Intent(Intent.ActionDial);
		intent.SetData(Android.Net.Uri.Parse("tel:" + phoneNumber.ToString()));
		intent.AddFlags(ActivityFlags.NewTask);
		context.StartActivity(intent);
	}


	public void UpdateContact(Person person)
	{
		var uri = ContactsContract.Contacts.ContentUri;
		var projection = new[] { ContactsContract.IContactsColumns.ContactLastUpdatedTimestamp };
		var selection = $"data = ?";
		var selectionArgs = new[] { $"{person.Id}" };

		if (uri == null) return;
		using var cursor = Android.App.Application.Context.ContentResolver?.Query(uri, projection, selection, selectionArgs, null);
		if (cursor != null && cursor.MoveToFirst())
		{
			var contactId = cursor.GetString(cursor.GetColumnIndex(ContactsContract.Intents.Insert.Data));
			var updateValues = new ContentValues();
			//updateValues.Put(ContactsContract.CommonDataKinds.StructuredName.DisplayName, newName);
			//updateValues.Put(ContactsContract.CommonDataKinds.Phone.Number, newPhoneNumber);
			//updateValues.Put(ContactsContract.CommonDataKinds.StructuredPostal.FormattedAddress, newAddress);
			//contentResolver.Update(uri, updateValues, $"{ContactsContract.DataColumns.ContactId} = ?", new[] { contactId }); cursor.Close();
		}
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