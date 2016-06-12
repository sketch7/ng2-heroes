import {Injectable} from "@angular/core";
import * as _ from "lodash";

import {AppState} from "../../app.state";

@Injectable()
export class HeroSelector {

	getAll() {
		return ($state: AppState) => $state.hero.heroes;
	}

	getByKey(key: string) {
		return ($state: AppState) => _.find(this.getAll()($state), { key: key });
	}

}