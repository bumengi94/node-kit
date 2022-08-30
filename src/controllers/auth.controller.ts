import { StatusCodes } from "../utils/statusCodes";
import { validateRequest } from "../utils/validates";
import { sign } from "jsonwebtoken";
import { loginUserService } from "../services/user.service";
import _ from "lodash";
import { User } from "../entities/User";
import { logger } from "../utils/logger";
import { FController } from "../types";

const log = logger("auth.controller");

export const checkAuthController: FController = async (req, res) => {
	log.debug("checkAuthController started");
	res.json(req["user"]);
};

export const loginController: FController<User> = async (req, res) => {
	log.debug("loginController started");
	validateRequest(req, { body: ["phone", "password"] });
	req.body.hash = req.body["password"];
	const result = _.toPlainObject(await loginUserService(req.body)) as User;
	const token = sign(result, process.env.SECRET, { expiresIn: "1w" });
	log.debug("loginController ended");
	res.status(StatusCodes.OK).json({ token });
};
