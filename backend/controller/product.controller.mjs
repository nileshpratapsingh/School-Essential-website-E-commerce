import product from "../config/passport.mjs";
import { previewData, cartItems, user, totalPrice } from "../config/data.mjs";

function productRoute(req, res) {
  res.render("pages/product", { product });
}

function productPreview(req, res) {
  const id = parseInt(req.params.id);
  const selectedProduct = previewData.find((p) => p.id === id);

  if (!selectedProduct) {
    return res
      .status(404)
      .render("pages/404", { pageTitle: "Product Not Found" });
  }

  res.render("pages/product-preview", { product: selectedProduct });
}

function checkoutRoute(req, res) {
  res.render("pages/checkout", { cartItems, totalPrice, user });
}

const productController = {
  productPreview,
  productRoute,
  checkoutRoute,
};

export default productController;