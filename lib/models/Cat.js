const pool = require('../utils/pool');

module.exports = class Cat {
  id;
  name;
  age;
  coat;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.age = row.age;
    this.coat = row.coat;
  }

  static async insert({ name, age, coat }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        cats (name, age, coat)
      VALUES
        ($1, $2, $3)
      RETURNING
        *
      `,
      [name, age, coat]
    );
    return new Cat(rows[0]);
  }
};
