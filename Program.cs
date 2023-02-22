using System.Text.Json.Serialization;
using CarpoolPickup.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddDbContext<ApplicationDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddSwaggerGen();
builder.Services.AddCors(opt =>
{
    opt.AddDefaultPolicy(policy =>
               {
                   policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin().Build();
               });
});

// Add middlewares
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseCors();
app.UseRouting();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

// Seed Data for Classes 
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<ApplicationDbContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedClassData(context);
}
catch (Exception ex)
{
    var _logger = services.GetRequiredService<ILogger<Program>>();
    _logger.LogError("Exception " + ex);
}

// Run app
app.Run();