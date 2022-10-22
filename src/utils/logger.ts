import { createLogger, format, transports } from "winston";
import chalk from "chalk";

const { combine, printf, colorize, timestamp, label, metadata } = format;

/**
 * Generates rgb color from name.
 * @param name {string}
 */
const colorFromName = (name: string) => {
	let hash = 0;
	if (name.length === 0) return hash;
	for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 4) - hash);
	const rgb = [0, 0, 0];
	for (let i = 0; i < 3; i++) rgb[i] = (hash >> (i * 4)) & 255;
	return rgb;
};

const isEmptyObject = (obj) => !Object.keys(obj).length;

/**
 * Custom log format for winston.
 */
const customFormat = () =>
	printf(({ level, message, metadata }) => {
		let { timestamp, label, ...props } = metadata;
		message = isEmptyObject(message) ? "" : JSON.stringify(message, null, 4);
		try {
			props = isEmptyObject(props) ? "" : typeof props === "object" ? JSON.stringify(props, null, 4) : props;
		} catch (e) {
			props = "";
		}
		const color = colorFromName(label);
		return `${timestamp} [${chalk.rgb(color[0], color[1], color[2])(label)}] [${level}] ${message} ${props}`;
	});

/**
 * Friendly logger.
 * @param prefix {string}
 */
export const logger = (prefix: string) =>
	createLogger({
		level: "silly",
		transports: [new transports.Console()],
		format: combine(colorize(), timestamp(), label({ label: prefix }), metadata(), customFormat()),
	});
