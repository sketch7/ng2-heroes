import {Action} from "@ngrx/store";

import {heroAction} from "./hero.action";
import {HeroState, Hero} from "./hero.model";

const initialState: HeroState = {
	isBusy: false,
	heroes: []
};

export function heroesReducer(state: HeroState = initialState, action: Action): HeroState {
	switch (action.type) {
		case heroAction.fetchAll:
			return Object.assign({}, state, {
				isBusy: true
			});
		case heroAction.fetchAllSuccess:
			return Object.assign({}, state, <HeroState>{
				isBusy: true,
				heroes: <Hero[]>action.payload
			});
		case heroAction.fetchAllFail:
			return Object.assign({}, state, {
				isBusy: false
			});
		default:
			return state;
	}
}