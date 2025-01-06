using Database;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;
interface INodeService
{
	Task<Note> AddNode(string? name, string value, CancellationToken cancellationToken);
	Task<IReadOnlyCollection<Note>> GetAll(CancellationToken cancellationToken);
}
public class NodeService(AppDbContext context) : INodeService
{
	public async Task<Note> AddNode(string? name, string value, CancellationToken cancellationToken)
	{
		var time = DateTime.Now;
		var node = new Note(time, name ?? time.ToShortDateString(), value);
		context.Notes.Add(node);
		await context.SaveChangesAsync(cancellationToken);
		return node;
	}

	public async Task<IReadOnlyCollection<Note>> GetAll(CancellationToken cancellationToken)
	{
		var result = await context.Notes.ToListAsync(cancellationToken);
		return result;
	}
}