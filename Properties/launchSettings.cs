using Microsoft.Extensions.FileProviders;

namespace LaunchSettings
{
	public class LaunchSettings
	{
		public static void Main(string[] args)
		{
			var dir = Directory.GetCurrentDirectory() + "\\";
			var bld = WebApplication.CreateBuilder(new WebApplicationOptions { WebRootPath = dir, ContentRootPath = dir });
			var app = bld.Build();
			app.UseDefaultFiles();
			app.UseStaticFiles ();
			app.Run();
		}
	}
}
