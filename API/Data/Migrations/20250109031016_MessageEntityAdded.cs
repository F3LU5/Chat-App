using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class MessageEntityAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Users_NadawcaId",
                table: "Messages");

            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Users_OdbiorcaId",
                table: "Messages");

            migrationBuilder.RenameColumn(
                name: "OdbiorcaId",
                table: "Messages",
                newName: "SenderId");

            migrationBuilder.RenameColumn(
                name: "OdbiorcaDel",
                table: "Messages",
                newName: "SenderDeleted");

            migrationBuilder.RenameColumn(
                name: "NazwaOdbiorcy",
                table: "Messages",
                newName: "SenderUsername");

            migrationBuilder.RenameColumn(
                name: "NazwaNadawcy",
                table: "Messages",
                newName: "RecipientUsername");

            migrationBuilder.RenameColumn(
                name: "NadawcaId",
                table: "Messages",
                newName: "RecipientId");

            migrationBuilder.RenameColumn(
                name: "NadawcaDel",
                table: "Messages",
                newName: "RecipientDeleted");

            migrationBuilder.RenameIndex(
                name: "IX_Messages_OdbiorcaId",
                table: "Messages",
                newName: "IX_Messages_SenderId");

            migrationBuilder.RenameIndex(
                name: "IX_Messages_NadawcaId",
                table: "Messages",
                newName: "IX_Messages_RecipientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Users_RecipientId",
                table: "Messages",
                column: "RecipientId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Users_SenderId",
                table: "Messages",
                column: "SenderId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Users_RecipientId",
                table: "Messages");

            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Users_SenderId",
                table: "Messages");

            migrationBuilder.RenameColumn(
                name: "SenderUsername",
                table: "Messages",
                newName: "NazwaOdbiorcy");

            migrationBuilder.RenameColumn(
                name: "SenderId",
                table: "Messages",
                newName: "OdbiorcaId");

            migrationBuilder.RenameColumn(
                name: "SenderDeleted",
                table: "Messages",
                newName: "OdbiorcaDel");

            migrationBuilder.RenameColumn(
                name: "RecipientUsername",
                table: "Messages",
                newName: "NazwaNadawcy");

            migrationBuilder.RenameColumn(
                name: "RecipientId",
                table: "Messages",
                newName: "NadawcaId");

            migrationBuilder.RenameColumn(
                name: "RecipientDeleted",
                table: "Messages",
                newName: "NadawcaDel");

            migrationBuilder.RenameIndex(
                name: "IX_Messages_SenderId",
                table: "Messages",
                newName: "IX_Messages_OdbiorcaId");

            migrationBuilder.RenameIndex(
                name: "IX_Messages_RecipientId",
                table: "Messages",
                newName: "IX_Messages_NadawcaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Users_NadawcaId",
                table: "Messages",
                column: "NadawcaId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Users_OdbiorcaId",
                table: "Messages",
                column: "OdbiorcaId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
