import { TMiddleware } from "../types";
import { logger } from "~@utils/logger";
import { verify } from "jsonwebtoken";
import { ErrorException } from "~@utils/errors";
import { EStatusCodes } from "~@utils/EStatusCodes";
import { EErrorCodes } from "~@utils/errorCodes";
import { User } from "~@entities/User";
import { getUserService } from "~@services/user.service";

const log = logger("auth.middleware");

export const basicAuthMiddleware: TMiddleware = async (req, res, next) => {
	log.debug("basicAuthMiddleware started");
	try {
		const token = req.headers.authorization.replace(/Bearer /i, "");
		const payload = verify(token, process.env.SECRET) as User;
		const user = await getUserService({ id: payload.id });
		if (!user || !user.enable)
			return next(new ErrorException(EErrorCodes.PERMISSION_DENIED, EStatusCodes.UNAUTHORIZED));
		log.debug("basicAuthMiddleware ended");
		req.user = user;
		next();
	} catch (e) {
		log.error("basicAuthMiddleware error: ", e);
		next(new ErrorException(EErrorCodes.PERMISSION_DENIED, EStatusCodes.UNAUTHORIZED));
	}
};
