//using CarpoolPickup.Models;
using System.Text.Json.Serialization;
using CarpoolPickup.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
//builder.Services.AddScoped<IClassRepository,ClassRepository>();
builder.Services.AddDbContext<ApplicationDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddSwaggerGen();
// builder.Services.AddCors(opt =>{
//     opt.AddPolicy("CorsPolicy",policy=>{
//         policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
//     });
// });

builder.Services.AddCors(opt =>
{
    opt.AddDefaultPolicy(policy =>
               {
                   policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin().Build();
               });
});


var app = builder.Build();


if (app.Environment.IsDevelopment())
{
   app.UseSwagger();
   app.UseSwaggerUI();
}
else
{
   app.UseDefaultFiles();
   app.UseStaticFiles();
}


app.UseCors();
app.UseRouting();


// app.UseCors("CorsPolicy");
// app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

//app.MapFallbackToFile("index.html");

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<ApplicationDbContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedClassData(context);
    await Seed.SeedPickupCarData(context);
}
catch (Exception ex)
{
    var _logger = services.GetRequiredService<ILogger<Program>>();
    _logger.LogError("Exception " + ex);
}


app.Run();