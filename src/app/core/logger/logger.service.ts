import {Injectable} from "@angular/core";

import {ILog} from "./logger.model";

@Injectable()
export class LoggerService {

	log(logType: string, message: string, data?: any): void {
		if (data) {
			(<any>console)[logType](message, data);
		} else {
			(<any>console)[logType](message);
		}
	}
}

export class Log implements ILog {

	constructor(
		private sourceId: string,
		private logger: LoggerService
	) {
	}

	debug(method: string, message?: string, data?: any): void {
		this.log("debug", method, message, data);
	}

	info(method: string, message?: string, data?: any): void {
		this.log("info", method, message, data);
	}

	warn(method: string, message?: string, data?: any): void {
		this.log("warn", method, message, data);
	}

	error(method: string, message?: string, data?: any): void {
		this.log("error", method, message, data);
	}

	private log(type: string, method: string, message?: string, data?: any) {
		this.logger.log(type, `${this.buildLogMessage(method, message)}`, data);
	}

	private buildLogMessage(method: string, message?: string): string {
		if (message) {
			return `[${this.sourceId}::${method}] ${message}`;
		} else {
			return `[${this.sourceId}::${method}]`;
		}
	}
}

