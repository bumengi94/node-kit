import { AppDataSource } from "./db";
import { User } from "./entities/User";
import { genSaltSync, hashSync } from "bcryptjs";
import { logger } from "./utils/logger";

const log = logger("seeds");

export default async () => {
	log.debug("seeds started");
	try {
		const userRepo = AppDataSource.getRepository(User);
		const user = new User();
		user.name = "admin";
		user.email = "admin";
		user.phone = "admin";
		user.hash = hashSync("qweqwe", genSaltSync(10));
		await userRepo.save(user);
		log.debug("seeds ended");
	} catch (e) {}
};
