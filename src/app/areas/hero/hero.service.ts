import * as _ from "lodash";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {LoggerFactory, ILog} from "ssv-ng2-core";

import {Hero} from "./hero.model";
import {HeroClient} from "./hero.client";

@Injectable()
export class HeroService {

	private logger: ILog;

	constructor(
		private heroClient: HeroClient,
		private loggerFactory: LoggerFactory
	) {
		this.logger = loggerFactory.get("heroService");
		this.logger.debug("ctor");
	}

	getAll(): Observable<Hero[]> {
		this.logger.debug("getAll");
		return this.heroClient.getAll();
	}

	getByKey(key: string): Observable<Hero> {
		return this.getAll()
			.map(x => {
				return _.find(x, { key: key });
			});
	}
}