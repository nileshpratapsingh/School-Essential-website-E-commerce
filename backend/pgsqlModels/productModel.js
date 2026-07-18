import BaseSchema from "./baseModel.js";
import { pool } from "../config/pgsql.mjs";
import Product from "../models/product.model.mjs";

class ProductSchema extends BaseSchema {
  async createProduct(id) {
    try {
      const product = await Product.findById(id);
      if (!product) return "No product found for backup!!";
      const data = {
        product_id: product._id.toString(),
        product_title: product.title,
        product_category: product.category,
        product_sub_category: product.subCategory,
        product_rating: product.rating,
        product_image: product.productImage,
        product_description: product.description,
        product_features: product.features,
        product_specs: product.specs,
      };
      const result = await BaseSchema.createOne("products", data);
      if (!result) console.log("Error in creating product backup!!");
      return result;
    } catch (err) {
      console.log("Error in creating product backup".red);
      console.log("Check:" + this.name);
      console.log(err);
    }
  }

  async displayProducts(id) {
    const find = BaseSchema.findOne("products", id);
    if (!find) return "No product find!!";
    return find;
  }

  async editProduct(productId, where) {
    try {
      const find = BaseSchema.findOne("products", productId);
      if (!find) return "No product found for edit!!";
      const keys = Object.keys(where);
      const values = Object.values(where);

      const setClause = keys
        .map((key, index) => `${key} = $${index + 1}`)
        .join(", ");

      const query = ` UPDATE products SET ${setClause} WHERE product_id = $${values.length + 1} RETURNING *; `;
      const result = await pool.query(query, [...values, productId]);
      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async toggleStock(productId, stock) {
    const find = BaseSchema.findOne("products", productId);
    if (!find) return "No product found for toggle!!";
    const query = `UPDATE TABLE products SET product_stock = $1 WHERE product_id = $2 RETURNING *;`;
    const result = pool.query(query, [stock, productId]);
    return result.rows[0];
  }

  async togglePurchase(counter, productId) {
    const find = BaseSchema.findOne("products", productId);
    if (!find) return "No product found to toggle purchase!!";
    const query = ` UPDATE TABLE products SET product_purchase = $1 WHERE product_id = $2 RETURNING *;`;
    const result = pool.query(query, [counter, productId]);
    return result.rows[0];
  }

  async deleteProduct(productId) {
    const query = `DELETE FROM products WHERE product_id = $1 RETURNING *;`;
    const result = pool.query(query, [productId]);
    return result.rows[0];
  }
}

export default ProductSchema;
