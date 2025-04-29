import { register, login} from "../controllers/authController.mjs";
import express from "express";

var router = express.Router();

    router.post("/register", register);

    router.post("/login", login);

export default router;