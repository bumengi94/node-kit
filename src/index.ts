import "reflect-metadata";
import main from "./main";
import { AppDataSource } from "./db";
import seeds from "./seeds";
import { logger } from "./utils/logger";

const log = logger("API");

(async () => {
	try {
		log.debug("Starting");
		await AppDataSource.initialize();
		const server = await main();
		await seeds();
		log.debug("Started");

		["SIGTERM", "SIGINT"].forEach((signal) =>
			process.on(signal, () => {
				AppDataSource.destroy();
				server.close();
				log.debug("Stopped");
			}),
		);
	} catch (e) {
		log.error(e);
	}
})();
