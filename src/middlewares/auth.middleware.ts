import { ErrorCodes } from "../utils/errorCodes";
import { ErrorException } from "../utils";
import { StatusCodes } from "../utils/statusCodes";
import { verify } from "jsonwebtoken";
import { getUserService } from "../services/user.service";
import { User } from "../entities/User";
import { logger } from "../utils/logger";
import { FMiddleware } from "../types";

const log = logger("auth.middleware");

export const basicMiddleware: FMiddleware = async (req, res, next) => {
	log.debug("basicMiddleware started");
	let token = req.headers.authorization || "";
	token = token.replace("Bearer ", "");
	if (!token) return next(new ErrorException(ErrorCodes.ACCESS_DENIED, StatusCodes.UNAUTHORIZED));
	try {
		const payload = verify(token, process.env.SECRET) as User;
		const user = await getUserService({ id: payload.id, email: payload.email, enable: true });
		if (!user) return next(new ErrorException(ErrorCodes.WRONG_CREDENTIALS, StatusCodes.UNAUTHORIZED));
		req["user"] = user;
		log.debug("basicMiddleware ended");
		next();
	} catch (e) {
		log.error("basicMiddleware error: ", e);
		next(new ErrorException(ErrorCodes.ACCESS_DENIED, StatusCodes.UNAUTHORIZED));
	}
};
