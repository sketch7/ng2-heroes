import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import * as _ from "lodash";

import {Hero} from "./hero.model";
import {HeroClient} from "./hero.client";


@Injectable()
export class HeroService {

	constructor(
		private heroClient: HeroClient
	) {

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