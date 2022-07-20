using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CS.Data.Migrations
{
    public partial class Exercicio : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Altura",
                schema: "Sistema",
                table: "Aluno",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Peso",
                schema: "Sistema",
                table: "Aluno",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateTable(
                name: "Exercicio",
                schema: "Sistema",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TipoExercicio = table.Column<int>(type: "integer", nullable: false),
                    Descricao = table.Column<string>(type: "text", nullable: true),
                    Restricao = table.Column<string>(type: "text", nullable: true),
                    GrupoCorporal = table.Column<int>(type: "integer", nullable: false),
                    QuantidadeRepeticao = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exercicio", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Exercicio",
                schema: "Sistema");

            migrationBuilder.DropColumn(
                name: "Altura",
                schema: "Sistema",
                table: "Aluno");

            migrationBuilder.DropColumn(
                name: "Peso",
                schema: "Sistema",
                table: "Aluno");
        }
    }
}
