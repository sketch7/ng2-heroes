import {Injectable} from "@angular/core";
import * as _ from "lodash";
import {Hero} from "./hero.model";
import {Heroes} from "./mock-heroes";


@Injectable()
export class HeroService {
	getAll(): Promise<Hero[]> {
		return Promise.resolve(Heroes);
	}

	getByKey(key: string): Promise<Hero> {
		return this.getAll().then((x: Hero[]) => {
			return _.find(x, { key: key });
		});
	}
}