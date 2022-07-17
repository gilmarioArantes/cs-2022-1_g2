using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CS.Data.Migrations
{
    public partial class Aluno : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Bairro",
                schema: "Sistema",
                table: "Professor",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CEP",
                schema: "Sistema",
                table: "Professor",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Cidade",
                schema: "Sistema",
                table: "Professor",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Complemento",
                schema: "Sistema",
                table: "Professor",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Estado",
                schema: "Sistema",
                table: "Professor",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Logradouro",
                schema: "Sistema",
                table: "Professor",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Numero",
                schema: "Sistema",
                table: "Professor",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Aluno",
                schema: "Sistema",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UsuarioId = table.Column<Guid>(type: "uuid", nullable: false),
                    Nome = table.Column<string>(type: "text", nullable: true),
                    Cpf = table.Column<string>(type: "text", nullable: true),
                    DataNascimento = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Logradouro = table.Column<string>(type: "text", nullable: true),
                    Numero = table.Column<int>(type: "integer", nullable: true),
                    Complemento = table.Column<string>(type: "text", nullable: true),
                    Bairro = table.Column<string>(type: "text", nullable: true),
                    Cidade = table.Column<string>(type: "text", nullable: true),
                    Estado = table.Column<int>(type: "integer", nullable: true),
                    CEP = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Aluno", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Aluno_Usuario_UsuarioId",
                        column: x => x.UsuarioId,
                        principalSchema: "Identidade",
                        principalTable: "Usuario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Aluno_UsuarioId",
                schema: "Sistema",
                table: "Aluno",
                column: "UsuarioId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Aluno",
                schema: "Sistema");

            migrationBuilder.DropColumn(
                name: "Bairro",
                schema: "Sistema",
                table: "Professor");

            migrationBuilder.DropColumn(
                name: "CEP",
                schema: "Sistema",
                table: "Professor");

            migrationBuilder.DropColumn(
                name: "Cidade",
                schema: "Sistema",
                table: "Professor");

            migrationBuilder.DropColumn(
                name: "Complemento",
                schema: "Sistema",
                table: "Professor");

            migrationBuilder.DropColumn(
                name: "Estado",
                schema: "Sistema",
                table: "Professor");

            migrationBuilder.DropColumn(
                name: "Logradouro",
                schema: "Sistema",
                table: "Professor");

            migrationBuilder.DropColumn(
                name: "Numero",
                schema: "Sistema",
                table: "Professor");
        }
    }
}
