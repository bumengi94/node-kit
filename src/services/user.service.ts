import { ErrorException } from "../utils";
import { ErrorCodes } from "../utils/errorCodes";
import { StatusCodes } from "../utils/statusCodes";
import bcrypt from "bcryptjs";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import { logger } from "../utils/logger";
import { ILike } from "typeorm";

const userRepo = AppDataSource.getRepository(User);
const log = logger("site.service");

export const createUserService = async (payload: User) => {
	log.debug("createUserService started");
	const data = new User();
	data.name = payload.name;
	data.email = payload.email;
	data.phone = payload.phone;
	log.debug("createUserService ended");
	return userRepo.save(data);
};

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

export const getUsersService = async (pagination: {
	page?: number;
	take?: number;
	query?: string;
	orderBy?: string;
	direction?: "ASC" | "DESC";
}) => {
	log.debug("getUsersService started");
	const { page, take, query, orderBy, direction } = pagination;
	const skip = (~~page || 0) * (~~take || 10);
	const where = !!query
		? [{ name: ILike(`%${query}%`) }, { phone: ILike(`%${query}%`) }, { email: ILike(`%${query}%`) }]
		: {};
	const order = {};
	if (!!orderBy) order[orderBy] = direction;
	else order["id"] = "ASC";
	const options = {
		where,
		skip,
		take: ~~take || 10,
		order,
	};
	return { data: await userRepo.find(options), count: await userRepo.count(options) };
};

export const updateUserService = async (id: number, payload: User) => {
	log.debug("updateUserService started");
	const data = await userRepo.findOne({ where: { id } });
	if (!data) throw new ErrorException(ErrorCodes.NOT_EXIST, StatusCodes.NOT_FOUND);
	if (payload?.name !== undefined) data.name = payload.name;
	if (payload?.email !== undefined) data.email = payload.email;
	if (payload?.phone !== undefined) data.phone = payload.phone;
	if (payload?.hash !== undefined) data.hash = bcrypt.hashSync(payload.hash, bcrypt.genSaltSync(10));
	log.debug("updateUserService ended");
	return userRepo.save(data);
};

export const deleteUserService = (id: number) => {
	log.debug("deleteUserService started");
	return userRepo.delete({ id });
};
