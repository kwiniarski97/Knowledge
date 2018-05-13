namespace Knowledge
{
    using AutoMapper;

    using Knowledge.Encryptors;
    using Knowledge.Repositories;
    using Knowledge.Repositories.Mongo;
    using Knowledge.Services;

    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;

    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            this.Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper();

            services.AddTransient<IPostService, PostService>();

            services.AddTransient<IPostRepository, PostRepositoryMongo>();

            services.Configure<MongoSettings>(
                options =>
                    {
                        options.ConnectionString = this.Configuration.GetSection("Mongo:ConnectionString").Value;
                        options.Database = this.Configuration.GetSection("Mongo:Database").Value;
                    });

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(policy => { policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().AllowCredentials(); });

            app.UseStaticFiles();

            MongoConfigurator.Initialize();

            app.UseMvc();
        }
    }
}