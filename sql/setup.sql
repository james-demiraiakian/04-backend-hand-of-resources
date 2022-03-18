DROP TABLE IF EXISTS cats, books, schools, juices, foods;

CREATE TABLE cats (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    age INT NOT NULL CHECK (age > -1),
    coat TEXT NOT NULL
);

INSERT INTO
    cats (name, age, coat)
VALUES
    ('Eowyn', 8, 'Calico'),
    ('Meena', 1, 'Tortoise-shell'),
    ('Froderic', 1, 'Black'),
    ('Ducky', 12, 'Orange Tabby');

CREATE TABLE books (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    book_number INT NOT NULL CHECK (series_length > 0),
    series_length INT NOT NULL CHECK (series_length > 0)
);

INSERT INTO
    books (title, author, book_number, series_length)
VALUES
    ('The Last Wish', 'Andrzej Sapkowski', 1, 6),
    ('Lord of Chaos', 'Robert Jordan', 7, 14),
    ('Jonathan Strange and Mr. Norell', 'Susanna Clarke', 1, 1);

CREATE TABLE schools (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    level TEXT NOT NULL
);

INSERT INTO
    schools (name, city, level)
VALUES
    ('Palm Springs High school', 'Palm Springs', 'High School'),
    ('Alchemy Code Lab', 'Portland', 'Trade School'),
    ('Arizona State University', 'Tempe', 'University');

CREATE TABLE juices (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type TEXT NOT NULL,
    blend BOOLEAN NOT NULL
);

CREATE TABLE foods (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    meal TEXT NOT NULL
);
