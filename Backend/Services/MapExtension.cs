using Backend.Dtos;
using Database;

namespace Backend.Services;

public static class MapExtension
{
	public static PersonDto Map(this Person data) =>
		new(
			data.Created,
			data.FirstName,
			data.LastName,
			data.BirthDate,
			data.Notes,
			data.Phone,
			data.Address
		)
		{
			Id = data.Id,
			EventTypeIds = data.EventType.Select(e => e.Id).ToList(),
		};
	public static Person Map(this PersonDto data) =>
		new(
			data.Created,
			data.FirstName,
			data.LastName,
			data.BirthDate,
			data.Notes,
			data.Phone,
			data.Address
		)
		{
			Id = data.Id,
			EventType = data.EventTypeIds?.Select(s => new EventType(null!) { Id = s }).ToList() ?? []
		};

	public static EventTypeDto Map(this EventType data) => new(
		data.Title
	)
	{
		Id = data.Id
	};
	public static EventType Map(this EventTypeDto data) => new(
		data.Title
	)
	{
		Id = data.Id
	};
}