
create TABLE genre(
    genre_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);

create TABLE film(
    film_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    creation_year INTEGER NOT NULL
);

create TABLE film_genre 
(
    film_id INTEGER REFERENCES film(film_id) ON DELETE CASCADE,
    genre_id INTEGER REFERENCES genre(genre_id) ON DELETE SET NULL,
    CONSTRAINT film_genre_pk PRIMARY KEY (film_id, genre_id)
);