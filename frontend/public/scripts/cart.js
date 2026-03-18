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
      const text = await res.text(); // read raw response first

      if (!res.ok) {
        throw new Error(text || "Failed to delete item");
      }

      try {
        return JSON.parse(text);
      } catch {
        throw new Error("Server did not return JSON");
      }
    })
    .then(() => {
      alert(`${title} has been removed from your cart`);
      window.location.reload(); // safest UI sync
    })
    .catch((err) => console.error("Cart Sync Error:", err.message));
}


function alterQuantity(productId, quantity, userId) {
  quantity = Number(quantity);

  if (quantity < 1 || isNaN(quantity)) return;

  // Optional: update quantity text instantly
  const qtyText = document.getElementById(`qty-text-${productId}`);
  if (qtyText) qtyText.innerText = quantity;

  fetch("/alter-quantity", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      id: productId,
      quantity: Number(quantity),
      user: String(userId),
    }),
  })
    .then(async (res) => {
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }
      return res.json();
    })
    // .then(async(data)=>{
    //     console.log("Quantity updated successfully",data);
    //     alert(`Quantity Updated:${data}`)
    // })
    .catch((err) => {
      console.error("Quantity update failed:", err);
    });
}

