import { Router } from "express";
import { checkAuthController, loginController } from "../controllers/auth.controller";
import { handleError } from "../utils";
import { basicMiddleware } from "../middlewares/auth.middleware";

export const authRouter = Router();

authRouter.post("/", handleError(loginController));

authRouter.use(basicMiddleware);
authRouter.get("/", handleError(checkAuthController));
