import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/roleMiddleware.js";
import {
  getAllUsers,
  activateUser,
  deactivateUser,
} from "../controllers/adminController.js";

const router = express.Router();

router.use(authMiddleware);
router.use(adminOnly);

router.get("/users", getAllUsers);
router.patch("/users/:id/activate", activateUser);
router.patch("/users/:id/deactivate", deactivateUser);

export default router;
