using Database;

namespace Backend.Dtos;

public record EventTypeDto(
	string Title

) : IEntity
{
	public int Id { get; init; }
}