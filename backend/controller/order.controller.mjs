import Order from "../models/order.model.mjs"; // Make sure model is exported as 'Order'

class OrderController {
  async displayAllOrders(_, res) {
    const orders = await Order.findAll();
    res.render("pages/orderList", {
      pageTitle: "Order List",
      orders,
    });
  }

  async toggleOrders(req, res) {
    const { orderId, orderStatus } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true },
    );
    res.status(200).json({ status: updatedOrder.orderStatus });
  }

  async userOrders(req, res) {
    const { userId } = req.body;
    const orders = await Order.find({ userId });

    if (!orders || orders.lenght === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    res.status(200).render("pages/userOrderList", {
      pageTitle: "Orders List",
      orders,
    });
  }
  async cancelOrder(req, res) {
    try {
      const { id } = req.params;

      const order = await Order.findById(id);

      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      if (order.status === "pending") {
        order.status = "cancelled";
        await order.save();

        return res.status(200).json({
          message: "Order cancelled successfully",
          order,
        });
      }

      return res.status(400).json({
        message: "Only pending orders can be cancelled",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  async returnOrder(req, res) {
    const { id, reason } = req.body;
    const order = await Order.findById(id);
  }
  async defectOrder(req, res) {
    const { id, reason } = req.body;
    const order = await Order.findById(id);
  }
}

export default OrderController;
