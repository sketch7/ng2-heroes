import * as _ from "lodash";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";

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

	getAllWithFilter(store: Store<AppState>): Observable<Hero[]> {
		return Observable.combineLatest(
			store.select(this.getAll()),
			store.select(this.getFilter()),
			(heroes, filter) => {
				if (!filter) {
					return heroes;
				}
				return heroes.filter(x => x.title === filter);
			}
		);
	}

	getByKey(key: string) {
		return ($state: AppState): Hero => _.find(this.getAll()($state), { key: key });
	}

	getFilter() {
		return ($state: AppState): string => $state.hero.filterTerm;
	}
}