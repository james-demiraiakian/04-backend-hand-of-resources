const pool = require('../utils/pool');

module.exports = class Juice {
  id;
  type;
  blend;

  constructor({ id, type, blend }) {
    this.id = id;
    this.type = type;
    this.blend = blend;
  }

  static async insert({ type, blend }) {
    const { rows } = await pool.query(
      `
        INSERT INTO 
            juices (type, blend) 
        VALUES 
            ($1, $2) 
        RETURNING 
            *
      `,
      [type, blend]
    );

    return new Juice(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
        SELECT 
            * 
        FROM 
            juices
      `
    );

    return rows.map((row) => new Juice(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT 
            * 
        FROM 
            juices 
        WHERE 
            id=$1
      `,
      [id]
    );

    return new Juice(rows[0]);
  }

  static async updateById(id, attributes) {
    const currentJuice = await Juice.findById(id);
    const { type, blend } = { ...currentJuice, ...attributes };
    const { rows } = await pool.query(
      `
        UPDATE
            juices
        SET
            type=$1,
            blend=$2
        WHERE
            id=$3
        RETURNING
            *
      `,
      [type, blend, id]
    );

    return new Juice(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM
            juices
        WHERE
            id=$1
        RETURNING
            *
      `,
      [id]
    );

    return new Juice(rows[0]);
  }
};
