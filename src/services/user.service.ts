import { ErrorException } from "../utils";
import { ErrorCodes } from "../utils/errorCodes";
import { StatusCodes } from "../utils/statusCodes";
import bcrypt from "bcryptjs";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import { logger } from "../utils/logger";

const userRepo = AppDataSource.getRepository(User);
const log = logger("user.service");

export const loginUserService = async (payload: Pick<User, "phone" | "hash">) => {
	log.debug("loginUserService started");
	const data = await userRepo.findOne({
		where: { phone: payload.phone, enable: true },
		select: ["id", "phone", "hash"],
	});
	const isCorrect = bcrypt.compareSync(payload.hash, data?.hash || "");
	if (!data || !isCorrect) throw new ErrorException(ErrorCodes.WRONG_CREDENTIALS, StatusCodes.UNAUTHORIZED);
	log.debug("loginUserService ended");
	return data;
};

export const getUserService = (where: Partial<User>) => {
	log.debug("getUserService started");
	return userRepo.findOne({ where });
};
