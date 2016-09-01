import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";

import { Hero } from "./hero.model";

const ACTION_PREFIX = "[hero]";
export const heroAction = {
	fetchAll: `${ACTION_PREFIX} fetch all`,
	fetchAllSuccess: `${ACTION_PREFIX} fetch all success`,
	fetchAllFail: `${ACTION_PREFIX} fetch all fail`,

	filter: `${ACTION_PREFIX} filter`,
};

@Injectable()
export class HeroAction {

	fetchAll(): Action {
		return {
			type: heroAction.fetchAll
		};
	}

	fetchAllSuccess(heroes: Hero[]): Action {
		return {
			type: heroAction.fetchAllSuccess,
			payload: heroes
		};
	}

	fetchAllFail(): Action {
		return {
			type: heroAction.fetchAllFail
		};
	}

	filter(term: string): Action {
		return {
			type: heroAction.filter,
			payload: term
		};
	}
}