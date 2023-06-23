const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");
const { default: knex } = require("knex");

class MoviesController {
  async create(request, response) {
    const { title, description, rating } = request.body;
    const { id } = request.query;

    const database = await sqliteConnection();

    const movie = await database.get(
      "SELECT * FROM movie_notes WHERE title = (?)",
      [title]
    );

    if (movie) {
      throw new AppError("Esse filme já foi registrado");
    }

    const movies_user_id = id;
    await database.run(
      "INSERT INTO movie_notes (title,description,rating,user_id) VALUES (?,?,?,?)",
      [title, description, rating, movies_user_id]
    );

    return response.status(201).json();
  }
  async show(request, response) {
    const { id } = request.params;

    const database = await sqliteConnection();

    const showMovieInfo = await database.get(
      "SELECT * FROM movie_notes WHERE id = (?)",
      [id]
    );

    return response.json(showMovieInfo);
  }

  async delete(request, response) {
    const { id } = request.params;
    await knex("movie_notes").where({ id }).delete();

    return response.json();
  }
}

module.exports = MoviesController;
