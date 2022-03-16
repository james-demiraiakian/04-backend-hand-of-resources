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
    ('Meena', 1, 'Tortoise-shell');

CREATE TABLE books (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL
);

CREATE TABLE schools (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    level TEXT NOT NULL
);

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
