import { Action } from "@ngrx/store";

import { heroAction } from "./hero.action";
import { HeroState, Hero } from "./hero.model";

const initialState: HeroState = {
	isBusy: false,
	heroes: [],
	filterTerm: ""
};

export function heroesReducer(state: HeroState = initialState, action: Action): HeroState {
	switch (action.type) {
		case heroAction.fetchAll:
			return Object.assign({}, state, {
				isBusy: true
			});
		case heroAction.fetchAllSuccess:
			return Object.assign({}, state, {
				isBusy: true,
				heroes: action.payload as Hero[]
			} as HeroState);
		case heroAction.fetchAllFail:
			return Object.assign({}, state, {
				isBusy: false
			});
		case heroAction.filter:
			return Object.assign({}, state, {
				filterTerm: action.payload
			});
		default:
			return state;
	}
}