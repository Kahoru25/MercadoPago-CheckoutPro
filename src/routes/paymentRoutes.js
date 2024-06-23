import { Router } from "express";
import { createOrder, receiveWebhook } from "../controllers/paymentController.js";
const router = Router()

router.post("/create-order", createOrder)
router.get("/success", (req, res) => res.send("success"))
router.get("/pending"), (req, res) => res.send("pending")
router.get("/order-failed", (req, res) => res.send("failed"))
router.post("/webhook", receiveWebhook)

export default router