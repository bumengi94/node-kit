import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "http";
import { EStatusCodes } from "~@utils/EStatusCodes";
import { ErrorException, handleError } from "~@utils/errors";
import { logger } from "~@utils/logger";
import { authRouter } from "~@routers/auth.router";

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
	handleError((req: Request, res: Response) => {
		log.debug("health check");
		res.sendStatus(EStatusCodes.OK);
	}),
);
app.use("*", (req: Request, res: Response) => res.sendStatus(EStatusCodes.NOT_FOUND));
app.use((err, req: Request, res: Response, _) => {
	log.error("error: ", err);
	if (err instanceof ErrorException) res.status(err.status).json(err.message);
	else res.sendStatus(EStatusCodes.INTERNAL_SERVER_ERROR);
});

export default () => new Promise<Server>((resolve) => resolve(app.listen(process.env.PORT)));
