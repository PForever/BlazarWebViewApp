using Backend.Services;
using Database;
using Microsoft.EntityFrameworkCore;

namespace Backend.Dtos;

public record PersonDto(
	DateTime Created,
	string? FirstName,
	string? LastName,
	DateTime? BirthDate,
	string? Notes,
	string? Phone,
	string? Address
) : IEntity
{
	public int Id { get; init; }
	public List<int>? EventTypeIds { get; set; }
}

public interface IPersonRepository
{
	IQueryable<Person> GetAll();
	Task<Person?> Get(int id);
	Task<int> Add(Person value);
	Task Delete(int id);
	Task<Person> Update(Person value);
}

public class PersonRepository(AppDbContext context) : IPersonRepository
{
	private readonly DbSet<Person> _set = context.People;
	public IQueryable<Person> GetAll() => _set.AsQueryable();
	public Task<Person?> Get(int id) => _set.Include(p => p.EventType).Where(t => t.Id == id).FirstOrDefaultAsync();
	public async Task<int> Add(Person value)
	{
		value.EventType.ForEach(e => context.EventTypes.Attach(e));
		_ = _set.Add(value);
		await context.SaveChangesAsync();
		return value.Id;
	}

	public async Task Delete(int id)
	{
		var value = await _set.Include(t => t.EventType).FirstOrDefaultAsync(t => t.Id == id);
		if (value is null) return;
		_set.Remove(value);
		await context.SaveChangesAsync();
	}

	public async Task<Person> Update(Person value)
	{
		_set.Update(value);
		await context.SaveChangesAsync();
		return value;
	}
}