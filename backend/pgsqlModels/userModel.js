import { pool } from "../config/pgsql.mjs";
import { Login, signup } from "../models/user.model.mjs";
import BaseSchema from "./baseModel.js";

export default class AuthSchema extends BaseSchema {
  async createUser(userId) {
    try {
      const user = await signup.findById(userId).lean();

      if (!user) {
        throw new Error("User not found");
      }

      const data = {
        user_id: user._id.toString(),
        first_name: user.firstName,
        middle_name: user.middleName,
        last_name: user.lastName,
        profile_image: user.profileImage,

        phone_number: user.phoneNumber,
        alternate_phone_number: user.alternatePhoneNumber,
        email: user.email,
        alternate_email: user.alternateEmail,

        date_of_birth: user.dateOfBirth,
        gender: user.gender,

        address_street: user.address?.street,
        address_city: user.address?.city,
        address_state: user.address?.state,
        address_zip: user.address?.zip,

        password: user.password,

        role: user.role,
        deprecated: false,
        created_at: user.createdAt,
      };

      const result = await BaseSchema.createOne("signups", { data });

      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async findUser(userId) {
    try {
      const query = `SELECT * FROM signups WHERE user_id = $1;`;
      const result = await pool.query(query, [userId.toString()]);
      console.log("user Id:", userId);
      return result.rows[0];
    } catch (err) {
      console.log(err);
    }
  }

  async loginUser(userId) {
    try {
      const user = await Login.findById(userId).lean();
      console.log(user);

      const find = await BaseSchema.findOne("login", {
        user_email: user.email,
      });
      if (find) BaseSchema.deleteOne("login", { user_id: userId });

      const data = {
        user_token: user.accessToken,
        user_id: user._id.toString(),
        user_email: user.email,
        user_password: user.password,
        user_role: user.role,
      };
      const result = await BaseSchema.createOne("login", data);
      console.log("Result:", result);
      return result.rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async deleteLogin(token) {
    try {
      const user = await BaseSchema.findOne("login", { user_token: token });
      if (!user) throw new Error("User not logged in!!");

      const id = user.user_id.toString();
      const result = BaseSchema.deleteOne("login", { user_id: id });
      if (!result) return;

      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async deleteUser(userId) {
    try {
      const id = userId.toString();
      const query = `DELETE FROM signups WHERE user_id = $1 RETURNING *;`;
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
