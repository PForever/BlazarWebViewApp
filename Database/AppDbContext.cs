using Microsoft.EntityFrameworkCore;

namespace Database;

public class AppDbContext : DbContext
{
	public AppDbContext()
	{
		const Environment.SpecialFolder folder = Environment.SpecialFolder.LocalApplicationData;
		var path = Environment.GetFolderPath(folder);
		DbPath = Path.Join(path, "App.db");
	}

	public string DbPath { get; set; }
	public required DbSet<Note> Notes { get; init; }
	public required DbSet<Person> People { get; init; }
	public required DbSet<EventType> EventTypes { get; init; }

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.Entity<EventType>().HasData(
			new("Diff") { Id = 1 },
			new("Conf") { Id = 2 },
			new("Vol") { Id = 3 },
			new("Pac") { Id = 4 },
			new("Sc") { Id = 5 },
			new("ScVol") { Id = 6 },
			new("Deb") { Id = 7 }
		);
	}

	protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) =>
		optionsBuilder.UseSqlite($"Data Source={DbPath}")
			//.UseSeeding((context, _) =>
			//{
			//	Seeding(context);
			//	context.SaveChanges();
			//})
			//.UseAsyncSeeding(async (context, _, token) =>
			//{
			//	Seeding(context);
			//	await context.SaveChangesAsync(token);
			//})
		;

	private static void Seeding(DbContext context)
	{
		context.Set<EventType>().AddRange(
			new("Diff") { Id = 1 },
			new("Conf") { Id = 2 },
			new("Vol") { Id = 3 },
			new("Pac") { Id = 4 },
			new("Sc") { Id = 5 },
			new("ScVol") { Id = 6 },
			new("Deb") { Id = 7 }
		);
	}
}

public interface IEntity
{
	int Id { get; init; }
}
[PrimaryKey(nameof(Id))]
public record Note(DateTime Created, string Name, string Value) : IEntity
{
	public int Id { get; init; }
}

[PrimaryKey(nameof(Id))]
public record Person(
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
	public List<EventType> EventType { get; set; } = [];

}


[PrimaryKey(nameof(Id))]
public record EventType(
	string Title

) : IEntity
{
	public int Id { get; init; }
}