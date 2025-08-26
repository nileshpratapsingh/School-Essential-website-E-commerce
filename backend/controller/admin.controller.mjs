import { Login, signup } from "../models/user.model.mjs";

function dashboardRoute(req, res) {
  res.render("admin/admin-dashboard", { pageTitle: "Admin-Dashboard" });
}

async function dashboardtoggle() {
  try {
    const admin = await Login.findOne({
      name: "Admin",
      passWord: "Kvw>_Eob&8<dXoYS<vB4",
      role: "admin",
    });

    if (admin) {
      res.redirect("/admin-dasboard");
      return true;
    } else {
      console.log("Model Error!!!");
      res.status(401).send("Unauthorized");
      return false;
    }
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).send("Server Error");
    return false;
  }
}

async function usersList(req, res) {
  try {
    let users = await signup.find();
    if (!users) {
      res.status(404).send({
        statusCode: 404,
        statusText: "Users not Found!!",
        message: "Corrupted data or Users list must be empty.",
        errorDetails: "Check Connections...",
      });
    }
    res.render("admin/users-list", { users });
  } catch (error) {
    console.log("Error in Users List", error.message);
    return res.status(500).send({
      statusCode: 500,
      statusText: "Check admin Controller",
      errorDetails: null,
    });
  }
}

const adminController = {
  usersList,
  dashboardRoute,
  dashboardtoggle,
};

export default adminController;
