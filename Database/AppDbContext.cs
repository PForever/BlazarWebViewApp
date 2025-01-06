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

	protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { optionsBuilder.UseSqlite($"Data Source={DbPath}"); }
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
public record Person(DateTime Created, string Name, string Value) : IEntity
{
	public int Id { get; init; }
}