import { AppDataSource } from "../db";
import { User } from "~@entities/User";
import { logger } from "~@utils/logger";
import { IPaginationOptions } from "../types";
import { ErrorException } from "~@utils/errors";
import { EErrorCodes } from "~@utils/errorCodes";
import { EStatusCodes } from "~@utils/EStatusCodes";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import _ from "lodash";

const userRepository = AppDataSource.getRepository(User);
const log = logger("user.service");

export const createUserService = async (userDTO: Partial<User>) => {
	log.debug("createUserService started");
	const data = await userRepository.save(userDTO);
	log.debug("createUserService ended");
	return data;
};

export const readUserService = (params: IPaginationOptions) => {
	log.debug("readUserService started");
	log.debug("readUserService ended");
};

export const getUserService = async (where: Partial<User>) => {
	log.debug("getUserService started");
	const data = await userRepository.findOneBy(where);
	log.debug("getUserService ended");
	return data;
};

export const updateUserService = () => {
	log.debug("updateUserService started");
	log.debug("updateUserService ended");
};

export const deleteUserService = () => {
	log.debug("deleteUserService started");
	log.debug("deleteUserService ended");
};

export const loginUserService = async (email: string, password: string) => {
	log.debug("loginUserService started");
	const data = await userRepository.findOne({
		where: { email, enable: true },
		select: { id: true, enable: true, email: true, hash: true },
	});
	const isCorrect = compareSync(password, data?.hash || "");
	if (!data || !isCorrect) throw new ErrorException(EErrorCodes.WRONG_CREDENTIALS, EStatusCodes.UNAUTHORIZED);
	delete data.hash;
	const token = sign(_.toPlainObject(data), process.env.SECRET, { expiresIn: "1w" });
	log.debug("loginUserService ended");
	return token;
};

export const registerUserService = async (email: string, password: string) => {
	log.debug("registerUserService started");
	const hash = hashSync(password, genSaltSync(10));
	const data = await createUserService({ email, hash });
	const token = sign(_.toPlainObject(data), process.env.SECRET, { expiresIn: "1w" });
	log.debug("registerUserService ended");
	return token;
};
