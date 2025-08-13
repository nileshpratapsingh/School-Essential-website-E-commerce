import { Login } from "../models/user.model.mjs";

function dashboardRoute(req, res) {
  res.render("admin/admin-dashboard", { pageTitle: null });
}

async function dashboardtrigger() {
  try {
    const admin = await Login.findOne({
      name: "Admin",
      passWord: "Kvw>_Eob&8<dXoYS<vB4",
    });

    if (admin) {
      res.redirect("/dasboard");
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

const adminController = {
  dashboardRoute,
  dashboardtrigger,
};

export default adminController;
