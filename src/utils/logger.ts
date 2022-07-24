import { createLogger, format, transports } from "winston";
import chalk from "chalk";

const { combine, printf, colorize, timestamp, label, metadata } = format;

const colorFromName = (name: string) => {
	let hash = 0;
	if (name.length === 0) return hash;

	for (let i = 0; i < name.length; i++) {
		hash = name.charCodeAt(i) + ((hash << 5) - hash);
	}

	let rgb = [0, 0, 0];
	for (let i = 0; i < 3; i++) {
		rgb[i] = (hash >> (i * 4)) & 255;
	}
	return rgb;
};

const isEmptyObject = (obj) => !Object.keys(obj).length;

const myF = () =>
	printf(({ level, message, metadata }) => {
		let { timestamp, label, ...props } = metadata;
		message = isEmptyObject(message) ? "" : JSON.stringify(message, null, 4);
		props = isEmptyObject(props) ? "" : JSON.stringify(props, null, 4);
		let color = colorFromName(label);
		return `${timestamp} [${chalk.rgb(color[0], color[1], color[2])(label)}] [${level}] ${message} ${props}`;
	});

export const logger = (prefix: string) =>
	createLogger({
		level: "silly",
		transports: [new transports.Console()],
		format: combine(colorize(), timestamp(), label({ label: prefix }), metadata(), myF()),
	});
