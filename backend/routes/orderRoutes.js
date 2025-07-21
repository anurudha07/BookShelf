import express from "express";
import {
  addOrderItems,
  getAllOrders,
  getLoggedInUserOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
  deleteOrder,
} from "../controllers/orderController.js";
import { admin, protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protectRoute, addOrderItems)
  .get(protectRoute, admin, getAllOrders);

router.route("/myorders").get(protectRoute, getLoggedInUserOrders);

router
  .route("/:id")
  .get(protectRoute, getOrderById)
  .delete(protectRoute, admin, deleteOrder);      // ← use protectRoute, not protect

router.route("/:id/pay").put(protectRoute, updateOrderToPaid);

router
  .route("/:id/deliver")
  .put(protectRoute, admin, updateOrderToDelivered);  // ← ensure admin guard here

export default router;
