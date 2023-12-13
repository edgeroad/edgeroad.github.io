using Microsoft.Extensions.FileProviders;

namespace WebApplication1.Properties
{
	public class launchSettings
	{
		public static void Main(string[] args)
		{
			var bld = WebApplication.CreateBuilder(args);
			var app = bld.Build();
			app.UseStaticFiles(new StaticFileOptions { FileProvider = new PhysicalFileProvider(Directory.GetCurrentDirectory() + "\\") });
			app.MapGet("/", () => "Hello World!");
			app.Run();
		}
	}
}