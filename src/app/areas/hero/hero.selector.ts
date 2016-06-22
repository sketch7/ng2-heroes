import {Injectable} from "@angular/core";
import * as _ from "lodash";

import {AppState} from "../../app.state";
import {Hero} from "./hero.model";

@Injectable()
export class HeroSelector {

	getAll() {
		return ($state: AppState): Hero[] => $state.hero.heroes;
	}

	getByKey(key: string) {
		return ($state: AppState): Hero => _.find(this.getAll()($state), { key: key });
	}

}