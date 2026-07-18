    async function checkout(event, amount, productIds, userId, userEmail) {
        const rawDate = $("#deliveryDate").val();
        const paymentMethod = $("#payment").val();
        const tax = Number($("#tax").text());
        const shipping = Number($("#shipping").text());
        const notes = $("#notes").val();

        $("#notes").on("change", function() {
            console.log($(this).val());
        });

        event.preventDefault();

        if (!rawDate) {
            alert("Please select a delivery date");
            return;
        }

        const deliveryDate = new Date(rawDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        if (paymentMethod === "RazorPay") {
            // Create order on backend

            console.log("Request:",{
                amount,
                productIds,
                userId,
                deliveryDate,
                paymentMethod,
                notes,
                tax,
                shipping,
            });

            try {
                const response = await fetch("/create_payment", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        amount,
                        currency:"INR"
                    }),
                    modal: {
                        ondismiss: function () {
                            alert("Payment cancelled");
                        }
                    }
                });

                const data = await response.json();
                console.log("Response:", data);

                const options = {
                    key: data.key,
                    amount: data.amount,
                    currency: data.currency,
                    order_id: data.orderId,
                    name: "School Essentials Ecommerce Website",

                    handler: async function (response) {
                        try {
                            console.log("Response from option handler:",response);

                            // Verify payment
                            const verifyResponse = await fetch("/verify_payment", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                credentials: "include",
                                body: JSON.stringify({
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_signature: response.razorpay_signature
                                })
                            });

                            const verifyData = await verifyResponse.json();

                            if (!verifyData.success) {
                                alert("Payment verification failed");
                                return;
                            }

                            const orderResponse = await fetch("/create_order", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                credentials: "include",
                                body: JSON.stringify({
                                    userId,
                                    productIds,
                                    paymentMethod,
                                    amount,
                                    email_address: userEmail,
                                    deliveryDate,
                                    notes,
                                    tax,
                                    shipping,
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id
                                })
                            });

                            const orderData = await orderResponse.json();

                            if (orderData.success) {
                                console.log("Order Data:",orderData)
                                alert("Order created successfully!");
                            }

                            } catch (err) {
                            console.error(err);
                            alert("Something went wrong");
                        }
                    },

                    modal: {
                        ondismiss() {
                            alert("Payment cancelled!!!");
                        }
                    }
                };

                const rzp = new Razorpay(options);
                rzp.open();

            } catch (err) {
                console.error("Fetch error:", err);
            }
        } else {
            // Cash on Delivery
            alert(
                `${deliveryDate}\n${paymentMethod}\n${notes}`
            );
        }
    }
