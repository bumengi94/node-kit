import { StatusCodes } from "../utils/statusCodes";
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

	log.debug("loginController ended");
	res.sendStatus(StatusCodes.OK);
};
