import {Injectable} from "@angular/core";
import {Action} from "@ngrx/store";

const ACTION_PREFIX = "[user]";
export const userAction = {
	set: `${ACTION_PREFIX} set`,
};

@Injectable()
export class UserAction {

	set(user: { alias: string }): Action {
		return {
			type: userAction.set,
			payload: user
		};
	}
}