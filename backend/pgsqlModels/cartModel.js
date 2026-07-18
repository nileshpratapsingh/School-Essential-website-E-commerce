import Product from "../models/product.model.mjs";
import { BaseSchema } from "./baseModel.js";
import { pool } from "pg";

export class cartModel extends BaseSchema {
  async saveCart(userId, productId, quantity, totalPrice) {
    if (!userId) throw new Error("User id not found!!");
    if (!productId) throw new Error("Product not found");
    const createdAt = new Date(rawDate).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const query = `INSERT into carts (userId, productId, quantity, totalPrice, createdAt, updatedAt)
    VALUES(${userId},${productId},${quantity},${totalPrice},${createdAt},${createdAt});`;
    const result = await pool.query(query);
    return result;
  }

  async findCart(userId) {
    try {
      const query = `SELECT * FROM carts where userId = ${userId} LIMIT 1;`;
      const result = await BaseSchema.execute(query);
      if (!result || result.lenght === 0) throw new Error("cart not found!!");
      return result;
    } catch (err) {
      console.log("find cart error plpgsql model error");
      console.log(err);
    }
  }

  async addItemToCart(productId, cartId) {
    try {
      const product = await BaseSchema.findOne('product', productId);
      if(!product) console.log("No product found for cart!!")
      const query = `UPDATE CART SET productIds = array_append(productIds, '${productId}') WHERE cartId = ${cartId}`;
    } catch (err) {
      console.log("add to cart  error pgsql model error");
      console.log(err);
    }
  }
  showTotal(cartId) {
    const query = `SELECT sum(price) from cart where cartId = ${cartId};`;
  }
  showItems() {}
  displayCart() {}
  addItemToCart() {}
}
