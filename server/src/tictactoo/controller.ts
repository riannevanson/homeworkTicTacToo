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

  @Post("/games/:name")
  @HttpCode(201)
  createGame(@Param("name") name: string) {
    const newGame = new Game();
    const colors = ["red", "blue", "green", "yellow", "magenta"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    newGame.color = randomColor;
    newGame.name = name; // aanpassen: user input via post ipv get
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
    // if (update.board !== undefined) {
    //   const game2 = game.rows;
    //   const update2 = update.rows;
    //   const totalMoves = (game2, update2) =>
    //     game2
    //       .map((row, y) => row.filter((cell, x) => update2[y][x] !== cell))
    //       .reduce((a, b) => a.concat(b)).length;

    //   if (totalMoves() > 1)
    //     throw new Error("You're moving too much (" + totalMoves() + "x)!");
    // }
    // console.log("total moves", totalMoves);

    return Game.merge(game, update).save();
  }
}
