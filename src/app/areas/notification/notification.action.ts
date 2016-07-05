import {Injectable} from "@angular/core";
import {Action} from "@ngrx/store";

import {NotificationMessage} from "./notification.model";

const ACTION_PREFIX = "[notification]";
export const notificationAction = {
	add: `${ACTION_PREFIX} add`,
	remove: `${ACTION_PREFIX} remove`,
};

@Injectable()
export class NotificationAction {

	add(message: NotificationMessage): Action {
		return {
			type: notificationAction.add,
			payload: message
		};
	}

	remove(id: number): Action {
		return {
			type: notificationAction.remove,
			payload: id
		};
	}
}