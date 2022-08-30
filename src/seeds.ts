import { AppDataSource } from "./db";
import { User } from "./entities/User";
import { genSaltSync, hashSync } from "bcryptjs";
import { logger } from "./utils/logger";
import _ from "lodash";

const log = logger("seeds");

export default () => {
	log.debug("seeds started");
	const userRepo = AppDataSource.getRepository(User);
	const user = new User();
	user.email = "admin";
	user.hash = hashSync("qweqwe", genSaltSync(10));
	userRepo.save(user).catch(_.noop);
	log.debug("seeds ended");
};
