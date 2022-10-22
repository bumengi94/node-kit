import { TController } from "../types";
import { logger } from "~@utils/logger";
import { loginUserService, registerUserService } from "~@services/user.service";
import { EStatusCodes } from "~@utils/EStatusCodes";
import { EErrorCodes } from "~@utils/errorCodes";

const log = logger("auth.controller");

export const loginAuthController: TController = async (req, res) => {
	log.debug("loginAuthController started");
	const { email, password } = req.body;
	const token = await loginUserService(email, password);
	log.debug("loginAuthController ended");
	res.status(EStatusCodes.OK).json({ token });
};

export const registerAuthController: TController = async (req, res) => {
	log.debug("registerAuthController started");
	const { email, password } = req.body;
	try {
		const token = await registerUserService(email, password);
		log.debug("registerAuthController ended");
		res.status(EStatusCodes.OK).json({ token });
	} catch (e) {
		log.error("registerAuthController error: ", e);
		res.status(EStatusCodes.CONFLICT).json(EErrorCodes.EXIST_USER);
	}
};

export const meAuthController: TController = async (req, res) => {
	log.debug("meAuthController started");
	const data = req.user;
	log.debug("meAuthController ended");
	res.status(EStatusCodes.OK).json(data);
};
