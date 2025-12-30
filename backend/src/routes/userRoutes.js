import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getCurrentUser,
  updateProfile,
  changePassword,
} from "../controllers/userController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/me", getCurrentUser);
router.put("/profile", updateProfile);
router.put("/password", changePassword);

export default router;
