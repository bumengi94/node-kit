import { Router } from "express";
import {
	activateController,
	checkAuthController,
	forgotController,
	loginController,
	updateAuthController,
} from "../controllers/auth.controller";
import { handleError } from "../utils";
import { basicMiddleware } from "../middlewares/auth.middleware";

export const authRouter = Router();

authRouter.post("/", handleError(loginController));
authRouter.post("/forgot", handleError(forgotController));
authRouter.post("/activate", handleError(activateController));

authRouter.use(basicMiddleware);
authRouter.get("/", handleError(checkAuthController));
authRouter.patch("/", handleError(updateAuthController));
