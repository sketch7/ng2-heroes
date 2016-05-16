import {Injectable} from "@angular/core";

import {ILog} from "./logger.model";
import {Log, LoggerService} from "./logger.service";

@Injectable()
export class LoggerFactory {

	constructor(
		private loggerService: LoggerService
	) {

	}

	getInstance(sourceId: string): ILog {
		return new Log(sourceId, this.loggerService);
	}
}