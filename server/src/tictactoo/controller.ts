import {
  Get,
  JsonController,
  Param,
  Post,
  HttpCode,
  Body,
  Put,
  NotFoundError
} from "routing-controllers";
import Game from "./entity";

@JsonController()
export default class GameController {
  @Get("/games/:id")
  @HttpCode(418)
  getGame(@Param("id") id: number) {
    // resolved promise to console log the right interface
    Game.findOne(id).then(function(game) {
      console.log(game.board);
    });
    return Game.findOne(id);
  }

  @Get("/games")
  async allGames() {
    const games = await Game.find();
    return { games };
  }

  @Post("/games")
  @HttpCode(201)
  createGame(@Body() input: Game) {
    const colors = ["red", "blue", "green", "yellow", "magenta"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newGame = new Game();
    newGame.color = randomColor;
    newGame.name = input.name;
    newGame.board =
      '{"rows":[\n\n' +
      '["o","o","o"],\n' +
      '["o","o","o"],\n' +
      '["o","o","o"]\n\n]}';
    return newGame.save();
  }

  @Put("/games/:id")
  async updateGame(@Param("id") id: number, @Body() update: Partial<Game>) {
    // check if ID is valid game
    const game = await Game.findOne(id);
    if (!game) throw new NotFoundError("Cannot find game");

    // check if color is valid
    const colors = ["red", "blue", "green", "yellow", "magenta"];
    if (
      update.color !== undefined &&
      colors.find(function(color) {
        return color === update.color;
      }) === undefined
    )
      throw new Error("Invalid color");

    // check if only 1 move is made ()
    if (update.board !== undefined) {
      await Game.findOne(id).then(function(game2) {
        const totalMoves = (board1, board2) =>
          board1
            .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
            .reduce((a, b) => a.concat(b)).length;

        if (
          totalMoves(
            JSON.parse(game2.board).rows,
            JSON.parse(update.board).rows
          ) > 1
        )
          throw new Error("You're moving too much!");
      });
    }

    return Game.merge(game, update).save();
  }
}
