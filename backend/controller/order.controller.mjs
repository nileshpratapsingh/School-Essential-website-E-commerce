import order from "../models/order.model.mjs"; // Make sure model is exported as 'Order'

function orderRoute(req, res) {
  res.render("pages/order", {
    pageTitle: "Order Status",
    order: null,
    error: null,
  });
}

async function orderStatus(req, res) {
  try {
    // GET order status by ID
    const { id } = req.params; // e.g., /orders/status/ORDER_ID

    // Find order by tracking ID
    const order = await order.findOne({ trackingId: id });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Return only status and timestamps
    return res.status(200).json({
      success: true,
      trackingId: order.trackingId,
      status: order.orderStatus,
      paymentMethod: order.paymentMethod,
      isPaid: order.isPaid,
      isDelivered: order.isDelivered,
      paidAt: order.paidAt,
      deliveredAt: order.deliveredAt,
    });
  } catch (error) {
    console.error("Error fetching order status:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const orderController = { orderStatus, orderRoute };

export default orderController;
