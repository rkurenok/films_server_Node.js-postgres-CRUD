const db = require('../db');
const checkFullField = require('../helpers/checkFullField');

class GenreController {
    async createGenre(req, res) {
        let validationMessage = checkFullField(req.body);

        if (validationMessage.length) {
            res.send(validationMessage);
        }
        else {
            const {name} = req.body;
            const newGenre = await db.query('INSERT INTO genre (title) values ($1) RETURNING *', [name]);
            res.send(newGenre.rows[0]);
        }
    }

    async getGenres(req, res) {
        const genres = await db.query(`SELECT * FROM genre order by genre_id`);
        res.send(genres.rows);
    }

    async getGenre(req, res) {
        const id = req.params.id;
        const genre = await db.query(`SELECT * FROM genre where genre_id = $1`, [id]);

        if (genre.rows.length == 0) {
            res.send("Такого жанра не существует");
        }
        else {
            res.send(genre.rows[0]);
        }
    }

    async updateGenre(req, res) {
        let validationMessage = checkFullField(req.body);

        if (validationMessage.length) {
            res.send(validationMessage);
            return;
        }

        const {id, name} = req.body;
        const genre = await db.query(`UPDATE genre set title = $1 where genre_id = $2 RETURNING *`, [name, id]);

        if (genre.rows.length === 0) {
            res.send("Такого жанра не существует");
        }
        else {
            res.send(genre.rows[0]);
        }
    }

    async deleteGenre(req, res) {
        const id = req.params.id;
        const genre = await db.query(`SELECT * FROM genre where genre_id = $1`, [id]);

        if (genre.rows.length === 0) {
            res.send("Такого жанра не существует");
        }
        else {
            await db.query(`DELETE FROM genre where genre_id = $1`, [id]);
            res.send(genre.rows[0]);
        }
    }
}

module.exports = new GenreController();