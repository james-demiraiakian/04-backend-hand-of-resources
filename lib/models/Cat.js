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

  static async findAll() {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            cats
      `
    );

    return rows.map((row) => new Cat(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          cats
        WHERE
          id=$1
      `,
      [id]
    );
    return new Cat(rows[0]);
  }

  static async updateById(id, attributes) {
    const currentCat = await Cat.findById(id);
    const updatedInfo = { ...currentCat, ...attributes };
    const { name, age, coat } = updatedInfo;
    const { rows } = await pool.query(
      `
      UPDATE
        cats
      SET
        name=$1,
        age=$2,
        coat=$3
      WHERE
        id=$4
      RETURNING
        *
      `,
      [name, age, coat, id]
    );
    return new Cat(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        cats
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );

    return new Cat(rows[0]);
  }
};
