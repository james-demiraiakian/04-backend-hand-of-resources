const pool = require('../utils/pool');

module.exports = class School {
  id;
  name;
  city;
  level;

  constructor({ id, name, city, level }) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.level = level;
  }

  static async insert({ name, city, level }) {
    const { rows } = await pool.query(
      `
        INSERT INTO 
          schools (name, city, level) 
        VALUES 
          ($1, $2, $3) 
        RETURNING 
          *
      `,
      [name, city, level]
    );
    return new School(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
        SELECT 
            * 
        FROM 
            schools
      `
    );

    return rows.map((row) => new School(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT 
          * 
        FROM 
          schools 
        WHERE 
          id=$1
      `,
      [id]
    );

    return new School(rows[0]);
  }

  static async updateById(id, attributes) {
    const currentSchool = await School.findById(id);
    const { name, city, level } = { ...currentSchool, ...attributes };
    const { rows } = await pool.query(
      `
        UPDATE 
            schools 
        SET 
            name=$1, 
            city=$2, 
            level=$3 
        WHERE 
            id=$4 
        RETURNING 
            *   
      `,
      [name, city, level, id]
    );

    return new School(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM 
            schools 
        WHERE 
            id=$1 
        RETURNING 
            *
      `,
      [id]
    );

    return new School(rows[0]);
  }
};
