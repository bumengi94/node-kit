import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import { StatusCodes } from "./utils/statusCodes";
import { ErrorException, handleError } from "./utils";
import { Server } from "http";
import { authRouter } from "./routers/auth.router";
import { logger } from "./utils/logger";

const log = logger("main");
dotenv.config();
export const app = express();
app.disable("etag");
app.use(express.json());
app.use(helmet());
app.use(cors({ origin: new RegExp(process.env.ORIGIN, "i") }));

app.use("/auth", authRouter);

app.use(
	"/health",
	handleError((req: Request, res: Response) => res.sendStatus(StatusCodes.OK)),
);
app.use("*", (req: Request, res: Response) => res.sendStatus(StatusCodes.NOT_FOUND));
app.use((err, req: Request, res: Response, _) => {
	log.error("error: ", err);
	if (err instanceof ErrorException) res.status(err.status).json(err.message);
	else res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
});

export default () =>
	new Promise<Server>((resolve) => {
		log.debug("main started");
		resolve(app.listen(process.env.PORT));
	});
