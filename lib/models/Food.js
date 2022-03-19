const pool = require('../utils/pool');

module.exports = class Food {
  id;
  name;
  country;
  meal;

  constructor({ id, name, country, meal }) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.meal = meal;
  }

  static async insert({ name, country, meal }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            foods (name, country, meal)
        VALUES 
            ($1, $2, $3)
        RETURNING
            *  
        `,
      [name, country, meal]
    );
    return new Food(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
        SELECT 
            * 
        FROM 
            foods    
      `
    );

    return rows.map((row) => new Food(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT 
            *
        FROM 
            foods 
        WHERE 
            id=$1
      `,
      [id]
    );

    return new Food(rows[0]);
  }

  static async updateById(id, attributes) {
    const currentFood = await Food.findById(id);
    console.log('currentFood', currentFood);
    const { name, country, meal } = { ...currentFood, ...attributes };
    const { rows } = await pool.query(
      `
        UPDATE
            foods
        SET
            name=$1,
            country=$2,
            meal=$3
        WHERE
            id=$4
        RETURNING
            *
      `,
      [name, country, meal, id]
    );

    return new Food(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM
            foods
        WHERE
            id=$1
        RETURNING
            *
      `,
      [id]
    );

    return new Food(rows[0]);
  }
};
