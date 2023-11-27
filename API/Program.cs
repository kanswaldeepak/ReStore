using API;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace ReStore
{
    class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            using var scope = host.Services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
            var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

            try
            {
                context.Database.Migrate();
                DbInitializer.Initialize(context);
            }
            catch(Exception ex)
            {
                logger.LogError(ex, "Problem loading PreFilled Data");
            }

            host.Run();
        }

        private static IHostBuilder CreateHostBuilder(string[] args)=>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder=>{
                webBuilder.UseStartup<Startup>();
            });
    }
}


