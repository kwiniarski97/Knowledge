namespace Knowledge
{
    using System;
    using System.Security.Claims;
    using System.Text;

    using AutoMapper;

    using Knowledge.Repositories;
    using Knowledge.Repositories.Mongo;
    using Knowledge.Services;
    using Knowledge.Settings;

    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.IdentityModel.Tokens;

    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder().SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true).AddEnvironmentVariables();

            this.Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper();

            services.AddTransient<IPostService, PostService>();

            services.AddTransient<IPostRepository, PostRepositoryMongo>();

            services.AddTransient<IAuthService, AuthService>();

            services.AddTransient<IUserRepository, UserRepositoryMongo>();

            services.Configure<MongoSettings>(options => this.Configuration.GetSection("Mongo").Bind(options));
            services.Configure<JwtSettings>(options => this.Configuration.GetSection("Jwt").Bind(options));

            var key = this.Configuration["Jwt:Key"];
            services.AddAuthentication(
                options =>
                    {
                        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    }).AddJwtBearer(
                options =>
                    {
                        options.SaveToken = true;
                        options.TokenValidationParameters = new TokenValidationParameters
                                                                {
                                                                    ValidateIssuer = false,
                                                                    ValidateAudience = false,
                                                                    ValidateIssuerSigningKey =
                                                                        false,
                                                                    IssuerSigningKey =
                                                                        new
                                                                            SymmetricSecurityKey(
                                                                                Encoding.ASCII
                                                                                    .GetBytes(
                                                                                        key)),
                                                                    RequireExpirationTime =
                                                                        false,
                                                                    ValidateLifetime = true,
                                                                    ClockSkew = TimeSpan.Zero
                                                                };
                    });

            services.AddAuthorization(options => options.AddPolicy(
                "Active",
                policy => { policy.RequireClaim("Status", "Activated"); }));

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

            app.UseAuthentication();

            app.UseStaticFiles();

            MongoConfigurator.Initialize();

            app.UseMvc();
        }
    }
}