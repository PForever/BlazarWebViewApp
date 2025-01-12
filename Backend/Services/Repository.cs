using Database;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

public interface IRepository<T> where T : class, IEntity
{
	IQueryable<T> GetAll();
	Task<T?> Get(int id);
	Task<int> Add(T value);
	Task Delete(int id);
	Task<T> Update(T value);
}
public class Repository<T>(AppDbContext context) : IRepository<T> where T : class, IEntity
{
	private readonly DbSet<T> _set = context.Set<T>();
	public IQueryable<T> GetAll() => _set.AsQueryable();
	public Task<T?> Get(int id) => _set.Where(t => t.Id == id).FirstOrDefaultAsync();
	public async Task<int> Add(T value)
	{
		_set.Add(value);
		await context.SaveChangesAsync();
		return value.Id;
	}

	public Task Delete(int id)
	{
		return _set.Where(t => t.Id == id).ExecuteDeleteAsync();
	}

	public async Task<T> Update(T value)
	{
		_set.Update(value);
		await context.SaveChangesAsync();
		return value;
	}
}