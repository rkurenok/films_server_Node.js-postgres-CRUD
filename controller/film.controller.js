const db = require('../db');
const checkFullField = require('../helpers/checkFullField');

class FilmController {

    async addFilm(req, res) {
        let validationMessage = checkFullField(req.body);

        if (validationMessage.length) {
            res.send(validationMessage);
            return;
        }

        const { name, year, genre } = req.body;

        if (year < 1888) {
            res.send("Проверьте год создания фильма");
            return;
        }

        const newFilm = await db.query('INSERT INTO film (title, creation_year) values ($1, $2) RETURNING *', [name, year]);

        if (genre == undefined || genre.length === 0) { // предполагаем, что id жанров передаются в массивах
            newFilm.rows[0].genre_titles = null; // если жанры не были заданы - ставим null
            res.send(newFilm.rows[0]);
            return;
        }

        const filmId = newFilm.rows[0].film_id;

        for await (const el of genre) {
            await db.query('INSERT INTO film_genre values ($1, $2) RETURNING *', [filmId, el]);
        }

        const film = await db.query(_basicQuery + `where film.film_id = $1 group by film.film_id`, [filmId]);

        res.send(film.rows[0]);
    }

    async getFilms(req, res) {
        const films = await db.query(_basicQuery + `group by film.film_id order by film.film_id`);
        res.send(films.rows);
    }

    async getFilm(req, res) {
        const id = req.params.id;
        const film = await db.query(_basicQuery + `where film.film_id = $1 group by film.film_id`, [id]);

        if (film.rows.length == 0) {
            res.send("Такого фильма не существует");
        }
        else {
            res.send(film.rows[0]);
        }
    }

    async updateFilm(req, res) {
        let validationMessage = checkFullField(req.body);

        if (validationMessage.length) {
            res.send(validationMessage);
            return;
        }

        const { id, name, year, genre } = req.body;

        if (year < 1888) {
            res.send("Проверьте год создания фильма");
            return;
        }

        const film = await db.query(`UPDATE film set title = $1, creation_year = $2 where film_id = $3 RETURNING *`, [name, year, id]); // изменяем параметры таблицы film

        if (film.rows.length == 0) {
            res.send("Такого фильма не существует");
            return;
        }

        if (genre != undefined && genre.length !== 0) {
            const genreArr = [];
            // проверяем, существуют ли жанры по новый id
            for (const el of genre) {
                genreArr.push(await db.query('SELECT * FROM genre where genre_id = $1', [el]));
            }

            for (let i = 0; i < genreArr.length; i++) {
                if (genreArr[i].rows.length === 0) {
                    res.send("Такого жанра не существует");
                    return;
                }
            }

            await db.query(`DELETE FROM film_genre where film_id = $1`, [id]); // удаляем предыдущие связи film_genre
            for (const el of genre) {
                await db.query('INSERT INTO film_genre values ($1, $2) RETURNING *', [id, el]); // добавляем новые связи film_genre
            }

            const changedFilm = await db.query(_basicQuery + `where film.film_id = $1 group by film.film_id`, [id]);
            res.send(changedFilm.rows[0]);
        }
        else {
            await db.query(`DELETE FROM film_genre where film_id = $1`, [id]); // удаляем предыдущие связи film_genre
            film.rows[0].genre_titles = null; // если жанры не были заданы - ставим null
            res.send(film.rows[0]);
        }
    }

    async deleteFilm(req, res) {
        const id = req.params.id;
        const film = await db.query(`SELECT * FROM film where film_id = $1`, [id]);

        if (film.rows.length === 0) {
            res.send("Такого фильма не существует");
            return;
        }

        const deletedFilm = await db.query(_basicQuery + `where film.film_id = $1 group by film.film_id`, [id]); // получаем удаляемый фильм
        await db.query(`DELETE FROM film where film_id = $1`, [id]); // удаляем фильм
        res.send(deletedFilm.rows[0]);
    }
}

const _basicQuery = `SELECT film.film_id, film.title, film.creation_year, string_agg(genre.title, ', ') as genre_titles ` +
    `FROM film LEFT JOIN film_genre ON film_genre.film_id=film.film_id LEFT JOIN genre ON film_genre.genre_id=genre.genre_id `;

module.exports = new FilmController();