import {LoggerFactory} from "./logger.factory";
import {LoggerService} from "./logger.service";

export * from "./logger.service";
export * from "./logger.factory";
export * from "./logger.model";

export const LOGGER_PROVIDERS: any = [
	LoggerFactory,
	LoggerService
];