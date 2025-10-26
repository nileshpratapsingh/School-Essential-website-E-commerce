function addToCart(id, title) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find((item) => item.id === id);
  const wasEmpty = cart.length === 0;

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  fetch("/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ productId: id, quantity: 1 }),
  })
    .then(async (res) => {
      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(`Failed to sync cart: ${errMsg}`);
      }
      return res.json();
    })
    .then(() => {
      alert(`${title} has been added to your cart`);

      if (wasEmpty) {
        window.location.href = "/cart";
      }
    })
    .catch((err) => console.error("Cart Sync Error:", err));
}

function deleteItem(title, productId, userId) {
  fetch("/delete-item", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ id: productId, user: userId }),
  })
    .then(async (res) => {
      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(`Failed to sync cart: ${errMsg}`);
      }
      return res.json();
    })
    .then(() => {
      alert(`${title} has been removed from your cart`);

      if (wasEmpty) {
        window.location.href = "/cart";
      }
    })
    .catch((err) => console.error("Cart Sync Error:", err));
}
