import { Action } from "@ngrx/store";

import { notificationAction } from "./notification.action";
import { NotificationState } from "./notification.model";

const initialState: NotificationState = {
	items: [
		{ id: 1, title: "Hello there!", isRead: true },
		{ id: 2, title: "A new champion has been released!", isRead: false },
		{ id: 3, title: "You have just won a game!", isRead: false },
	]
};

export function notificationReducer(state: NotificationState = initialState, action: Action): NotificationState {
	switch (action.type) {
		case notificationAction.add:
			return Object.assign({}, state, {
				items: [...state.items, action.payload]
			});
		case notificationAction.remove:
			return Object.assign({}, state,
				state.items.filter(x => x.id !== action.payload as number)
			);
		default:
			return state;
	}
}