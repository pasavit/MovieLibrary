using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPISample.Migrations
{
    public partial class AddedMovieImagesseeded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MovieImage",
                table: "Movies",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Movies",
                keyColumn: "MovieId",
                keyValue: 1,
                column: "MovieImage",
                value: "https://xl.movieposterdb.com/06_10/2006/0407887/xl_138581_0407887_3f7c779a.jpg");

            migrationBuilder.UpdateData(
                table: "Movies",
                keyColumn: "MovieId",
                keyValue: 2,
                column: "MovieImage",
                value: "https://xl.movieposterdb.com/08_04/2008/468569/xl_468569_828524e8.jpg");

            migrationBuilder.UpdateData(
                table: "Movies",
                keyColumn: "MovieId",
                keyValue: 3,
                column: "MovieImage",
                value: "https://xl.movieposterdb.com/10_06/2010/1375666/xl_1375666_5d9403a0.jpg");

            migrationBuilder.UpdateData(
                table: "Movies",
                keyColumn: "MovieId",
                keyValue: 4,
                column: "MovieImage",
                value: "https://xl.movieposterdb.com/08_08/2008/910936/xl_910936_53c4f8a6.jpg");

            migrationBuilder.UpdateData(
                table: "Movies",
                keyColumn: "MovieId",
                keyValue: 5,
                column: "MovieImage",
                value: "https://xl.movieposterdb.com/15_04/1988/95016/xl_95016_989d054a.jpg");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MovieImage",
                table: "Movies");
        }
    }
}
