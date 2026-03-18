/*
 * Base class model for Postgres models
 * Can be extended for further schemas
 */

import { pool } from "../config/pgsql.mjs";

export async function showDatabase() {
  const result = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
  `);
  // console.log("Tables in database:", result.rows);
  // console.log("Tables data:", data.rows);
}
export class BaseSchema {
  static table = null;

  static validateTable() {
    if (!this.table) {
      throw new Error("Table name is not defined on model");
    }
  }

  static buildWhereClause(where = {}) {
    const keys = Object.keys(where);
    if (!keys.length) {
      throw new Error("Where clause cannot be empty");
    }

    const values = Object.values(where);
    const clause = keys.map((k, i) => `"${k}" = $${i + 1}`).join(" AND ");

    return { clause, values };
  }

  static async showDatabaseTables() {
    const result = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
  `);
    console.log("Tables in database:", result.rows);
  }

  static async findOne(tableName, where) {
    this.validateTable();
    const keys = Object.keys(where);
    const values = Object.values(where);
    const conditions = keys.map((k, i) => `"${k}"=$${i + 1}`).join(" AND ");
    const { rows } = await pool.query(
      `SELECT * FROM ${tableName} WHERE ${conditions} LIMIT 1`,
      values,
    );
    return rows[0] || null;
  }

  static async findAll(tableName) {
    this.validateTable();
    return await pool.query(`SELECT * FROM ${tableName};`);
  }

  static async createOne({ data }, tableName) {
    this.validateTable();
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(",");
    const query = `INSERT INTO ${tableName} (${keys.join(
      ",",
    )}) VALUES (${placeholders}) RETURNING *`;

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async createMany() {
    this.validateTable();
  }

  static async deleteone(id, tableName) {
    this.validateTable();
    const { rows } = await pool.query(
      `DELETE FROM ${tableName} WHERE id=$1 RETURNING *`,
      [id],
    );
    return rows[0];
  }

  static async deleteMany(tableName) {
    this.validateTable();
      const {deleteMany} = await pool.query(
          `DELETE * FROM ${tableName};`
      );
      return deleteMany;
  }
}
