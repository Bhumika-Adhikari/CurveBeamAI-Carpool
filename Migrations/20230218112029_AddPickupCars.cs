using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarpoolPickup.Migrations
{
    public partial class AddPickupCars : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PickupCarId",
                table: "Students",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "PickupCars",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationNumber = table.Column<string>(type: "TEXT", nullable: false),
                    HasLeft = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PickupCars", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Students_PickupCarId",
                table: "Students",
                column: "PickupCarId");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_PickupCars_PickupCarId",
                table: "Students",
                column: "PickupCarId",
                principalTable: "PickupCars",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_PickupCars_PickupCarId",
                table: "Students");

            migrationBuilder.DropTable(
                name: "PickupCars");

            migrationBuilder.DropIndex(
                name: "IX_Students_PickupCarId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "PickupCarId",
                table: "Students");
        }
    }
}
