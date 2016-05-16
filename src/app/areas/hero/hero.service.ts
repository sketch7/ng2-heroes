import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import * as _ from "lodash";

import {Hero} from "./hero.model";
import {HeroClient} from "./hero.client";
import {LoggerFactory, ILog} from "../../core/logger/logger";

@Injectable()
export class HeroService {

	private logger: ILog;

	constructor(
		private heroClient: HeroClient,
		private loggerFactory: LoggerFactory
	) {
		this.logger = loggerFactory.getInstance("heroService");
		this.logger.debug("ctor");
	}

	getAll(): Observable<Hero[]> {
		return this.heroClient.getAll();
	}

	getByKey(key: string): Observable<Hero> {
		return this.getAll()
			.map(x => {
				return _.find(x, { key: key });
			});
	}
}