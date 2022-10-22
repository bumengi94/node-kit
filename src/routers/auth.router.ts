import { Router } from "express";
import { handleError } from "~@utils/errors";
import { loginAuthController, meAuthController, registerAuthController } from "~@controllers/auth.controller";
import { loginValidator, registerValidator } from "~@validators/auth.validator";
import { basicAuthMiddleware } from "~@middlewares/auth.middleware";

export const authRouter = Router();

authRouter.post("/", handleError(loginAuthController, loginValidator));
authRouter.post("/register", handleError(registerAuthController, registerValidator));

authRouter.use(basicAuthMiddleware);
authRouter.get("/", handleError(meAuthController));
