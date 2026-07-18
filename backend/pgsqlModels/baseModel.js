/*
 * Base class model for Postgres models
 * Can be extended for further schemas
 */

import { pool } from "../config/pgsql.mjs";

export async function showDatabase() {
  const result = await pool.query(
    `select first_name,middle_name,user_id,last_name from signups;`,
  );
  // console.log("Tables in database:", result.rows);
  console.log(
    "Tables data:",
    result.rows.map(
      (r) =>
        r.first_name +
        " " +
        r.middle_name +
        " " +
        r.last_name +
        " " +
        r.user_id,
    ),
  );
  // console.log(result.fields.map((f)=>(f.name)))
  // console.log(result);
}

export default class BaseSchema {
  static table = null;

  constructor(tableName) {
    this.table = tableName;
  }

  static validateTable() {
    if (!this.table) {
      throw new Error("Table name is not defined on model");
    }
  }

  static async execute(query, values = []) {
    if (!query) {
      throw new Error("Query is required.");
    }

    const result = await pool.query(query, values);
    return result;
  }

  static buildWhereClause(where = {}) {
    const keys = Object.keys(where);

    if (!keys.length) {
      throw new Error("Where clause cannot be empty");
    }

    const values = Object.values(where);

    const clause = keys.map((k, i) => `"${k}" = $${i + 1}`).join(" AND ");

    return {
      clause,
      values,
    };
  }

  static buildOrWhereClause(where = {}) {
    const keys = Object.keys(where);
    if (!keys.lenght) {
      throw new Error("WHERE clause cannot be empty");
    }
    const values = Object.values(where);
    const clause = keys.map((i, k) => `"${k} = $${i + 1}"`.join("OR"));
    return { clause, values };
  }

  static async showDatabaseTables() {
    const result = await BaseSchema.execute(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
      `);
    console.log("Tables in database:", result.rows);
  }

  static async findOne(tableName, where) {
    const { clause, values } = BaseSchema.buildWhereClause(where);

    const { rows } = await BaseSchema.execute(
      `SELECT * FROM ${tableName} WHERE ${clause} LIMIT 1`,
      values,
    );

    return rows[0] || null;
  }

  static async findAll(tableName) {
    this.validateTable();
    return await BaseSchema.execute(`SELECT * FROM ${tableName};`);
  }

  static async createOne(tableName, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const columns = keys.map((key) => `"${key}"`).join(", ");
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");

    const query = ` INSERT INTO ${tableName} (${columns}) VALUES (${placeholders}) RETURNING *;`;

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async createMany(tableName, data) {
    if (!data.length) return;

    const keys = Object.keys(data[0]);
    const columns = keys.join(", ");
    const values = data.flatMap((obj) => Object.values(obj));

    const rows = data.map((_, index) => {
      const placeholders = keys.map(
        (_, i) => `$${index * keys.length + i + 1}`,
      );
      return `(${placeholders.join(", ")})`;
    });

    const query = `INSERT INTO ${tableName} (${columns}) VALUES ${rows.join(", ")}`;

    const result = await BaseSchema.execute(query, values);
    return result.rows;
  }

  static async deleteOne(tableName, where) {
    const { values, clause } = BaseSchema.buildWhereClause(where);

    const { rows } = await pool.query(
      `DELETE FROM ${tableName} WHERE ${clause} RETURNING *;`,
      values,
    );

    console.log("deleteOne called");

    return rows;
  }

  static async deleteMany(tableName) {
    const { deleteMany } = await BaseSchema.execute(
      `DELETE * FROM ${tableName};`,
    );
    return deleteMany;
  }

  static async updateOne(tableName, data, where = {}) {
    const data_keys = Object.keys(data);
    const data_values = Object.values(data);

    const { clause, values } = BaseSchema.buildWhereClause(where);
    const setClause = data_keys
      .map((key, i) => `${key} = $${i + 1}`)
      .join(", ");

    const query = `
      UPDATE ${tableName}
      SET ${setClause}
      WHERE ${clause}
      RETURNING *;
      `;

    const result = await pool.query(query, [...data_values, ...values]);
    return result.rows[0];
  }

  static async countTotalEntries(tableName, where = {}) {
    const { clause, values } = BaseSchema.buildWhereClause(where);

    const query = Object.keys(where).length
      ? `SELECT COUNT(*) AS total FROM ${tableName} WHERE ${clause};`
      : `SELECT COUNT(*) AS total FROM ${tableName};`;

    const { rows } = await BaseSchema.execute(query, values);

    return Number(rows[0].total);
  }
}
