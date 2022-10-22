import { genSaltSync, hashSync } from "bcryptjs";
import _ from "lodash";
import { AppDataSource } from "./db";
import { User } from "~@entities/User";
import { logger } from "~@utils/logger";

const log = logger("seeds");

/**
 * Initial user register.
 */
export default () => {
	log.debug("seeds started");
	const userRepo = AppDataSource.getRepository(User);
	const user = new User();
	user.email = "admin@admin.com";
	user.hash = hashSync("qweqwe", genSaltSync(10));
	userRepo.save(user).catch(_.noop);
	log.debug("seeds ended");
};
