import * as _ from "lodash";
import {Injectable} from "@angular/core";

import {AppState} from "../../app.state";
import {Hero} from "./hero.model";

@Injectable()
export class HeroSelector {

	getAll() {
		return ($state: AppState): Hero[] => $state.hero.heroes;
	}

	getAllTop(count: number) {
		return ($state: AppState): Hero[] => _.take(this.getAll()($state), count);
	}

	getByKey(key: string) {
		return ($state: AppState): Hero => _.find(this.getAll()($state), { key: key });
	}

}