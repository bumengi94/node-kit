import "reflect-metadata";
import main from "./main";
import { AppDataSource } from "./db";
import seeds from "./seeds";
import { logger } from "~@utils/logger";

const log = logger("api");

/**
 * Start point.
 */
(async () => {
	try {
		log.debug("started");
		await AppDataSource.initialize();
		const server = await main();
		seeds();
		log.debug("ended");
		["SIGTERM", "SIGINT"].forEach((signal) =>
			process.on(signal, () => {
				AppDataSource.destroy();
				server.close();
				log.debug("stopped");
			}),
		);
	} catch (e) {
		log.error("error: ", e);
	}
})();
