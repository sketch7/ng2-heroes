import {Action} from "@ngrx/store";

import {userAction} from "./user.action";
import {UserState} from "./user.model";

const initialState: UserState = {
	alias: "Chiko"
};

export function userReducer(state: UserState = initialState, action: Action): UserState {
	switch (action.type) {
		case userAction.set:
			return Object.assign({}, state, action.payload);
		default:
			return state;
	}
}