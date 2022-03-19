const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title;
  author;
  bookNumber;
  seriesLength;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.author = row.author;
    this.bookNumber = row.book_number;
    this.seriesLength = row.series_length;
  }

  static async insert({ title, author, bookNumber, seriesLength }) {
    const { rows } = await pool.query(
      `
      INSERT INTO 
        books (title, author, book_number, series_length) 
      VALUES 
        ($1, $2, $3, $4) 
      RETURNING 
        *
      `,
      [title, author, bookNumber, seriesLength]
    );
    return new Book(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
        SELECT 
            * 
        FROM 
            books
      `
    );

    return rows.map((row) => new Book(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT 
            * 
        FROM 
            books 
        WHERE 
            id=$1
      `,
      [id]
    );
    return new Book(rows[0]);
  }

  static async updateById(id, attributes) {
    const currentBook = await Book.findById(id);
    const updatedInfo = { ...currentBook, ...attributes };
    const { title, author, bookNumber, seriesLength } = updatedInfo;
    const { rows } = await pool.query(
      `
        UPDATE 
            books 
        SET 
            title=$1, 
            author=$2, 
            book_number=$3, 
            series_length=$4 
        WHERE 
            id=$5 
        RETURNING 
            *
      `,
      [title, author, bookNumber, seriesLength, id]
    );
    return new Book(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM 
            books 
        WHERE 
            id=$1 
        RETURNING 
            *
      `,
      [id]
    );

    return new Book(rows[0]);
  }
};
