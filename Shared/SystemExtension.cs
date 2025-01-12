using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared;
public static class SystemExtension
{
	public static async Task<TResult> When<T, TResult>(this Task<T> task, Func<T, TResult> action)
	{
		var result = await task;
		return action(result);
	}
}
