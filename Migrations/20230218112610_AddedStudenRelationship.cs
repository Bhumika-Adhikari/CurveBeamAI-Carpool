using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarpoolPickup.Migrations
{
    public partial class AddedStudenRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_PickupCars_PickupCarId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Students_PickupCarId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "PickupCarId",
                table: "Students");

            migrationBuilder.CreateTable(
                name: "PickupCarStudent",
                columns: table => new
                {
                    PickupCarsId = table.Column<int>(type: "INTEGER", nullable: false),
                    StudentsId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PickupCarStudent", x => new { x.PickupCarsId, x.StudentsId });
                    table.ForeignKey(
                        name: "FK_PickupCarStudent_PickupCars_PickupCarsId",
                        column: x => x.PickupCarsId,
                        principalTable: "PickupCars",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PickupCarStudent_Students_StudentsId",
                        column: x => x.StudentsId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PickupCarStudent_StudentsId",
                table: "PickupCarStudent",
                column: "StudentsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PickupCarStudent");

            migrationBuilder.AddColumn<int>(
                name: "PickupCarId",
                table: "Students",
                type: "INTEGER",
                nullable: true);

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
    }
}
