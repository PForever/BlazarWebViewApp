using Database;

namespace Backend.Services;

//public interface IReadRepository
//{
//	ValueTask<object?> Get(string tableName, int id);
//	IQueryable<object> GetAll(string tableName);
//}

//public class ReadRepository(IServiceProvider provider) : IReadRepository
//{
//	public async ValueTask<object?> Get(string tableName, int id)
//	{
//		return tableName switch
//		{
//			nameof(AppDbContext.Notes) => await provider.GetRequiredService<IRepository<Note>>().Get(id),
//			nameof(AppDbContext.People) => await provider.GetRequiredService<IRepository<Person>>().Get(id),
//			_ => throw new ArgumentOutOfRangeException(tableName)
//		};
//	}
//	public IQueryable<object> GetAll(string tableName)
//	{
//		return tableName switch
//		{
//			nameof(AppDbContext.Notes) => provider.GetRequiredService<IRepository<Note>>().GetAll(),
//			nameof(AppDbContext.People) => provider.GetRequiredService<IRepository<Person>>().GetAll(),
//			_ => throw new ArgumentOutOfRangeException(tableName)
//		};
//	}

//	public async ValueTask Add(string tableName, object entity)
//	{
//		switch (tableName)
//		{
//			case nameof(AppDbContext.Notes):
//				return await provider.GetRequiredService<IRepository<Note>>().Add((Note)entity).Commit();
//			case nameof(AppDbContext.People):
//				return await provider.GetRequiredService<IRepository<Person>>().Add((Person)entity).Commit();
//			default:
//				throw new ArgumentOutOfRangeException(tableName);
//		}
//	}

//	public async ValueTask Delete(string tableName, int id)
//	{
//		switch (tableName)
//		{
//			case nameof(AppDbContext.Notes):
//				provider.GetRequiredService<IRepository<Note>>().Delete(new Note {Id = id});
//				break;
//			case nameof(AppDbContext.People):
//				provider.GetRequiredService<IRepository<Person>>().Delete(id);
//				break;
//			default:
//				throw new ArgumentOutOfRangeException(tableName);
//		}
//	}

//	public async ValueTask<object?> Update(string tableName, object entity)
//	{
//		switch (tableName)
//		{
//			case nameof(AppDbContext.Notes):
//				return await provider.GetRequiredService<IRepository<Note>>().Update((Note)entity);
//			case nameof(AppDbContext.People):
//				return await provider.GetRequiredService<IRepository<Person>>().Update((Person)entity);
//			default:
//				throw new ArgumentOutOfRangeException(tableName);
//		}
//	}



//}