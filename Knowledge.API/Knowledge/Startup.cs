using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Knowledge
{
    using AutoMapper;

    using Knowledge.Encryptors;
    using Knowledge.Repositories;
    using Knowledge.Services;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            services.AddAutoMapper();

            services.AddTransient<IPostService, PostService>();

            services.AddTransient<IPostRepository, InMemoryDataBase>();

            services.AddTransient<EncryptedFile>();
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

            app.UseMvc();
        }
    }
}