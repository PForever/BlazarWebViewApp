using Database;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

public interface IRepository<T> where T : class, IEntity
{
	IQueryable<T> GetAll();
	Task<T?> Get(int id);
	IRepository<T> Add(T value);
	IRepository<T> Delete(int id);
	IRepository<T> Update(T value);
	Task Commit();
}
public class Repository<T>(AppDbContext context) : IRepository<T> where T : class, IEntity
{
	private readonly DbSet<T> _set = context.Set<T>();
	public IQueryable<T> GetAll() => _set.AsQueryable();
	public Task<T?> Get(int id) => _set.Where(t => t.Id == id).FirstOrDefaultAsync();
	public IRepository<T> Add(T value)
	{
		_set.Add(value);
		return this;
	}

	public IRepository<T> Delete(int id)
	{
		_set.Select(t => t.Id).ExecuteDelete();
		return this;
	}

	public IRepository<T> Update(T value)
	{
		_set.Update(value);
		return this;
	}

	public Task Commit() => context.SaveChangesAsync();
}