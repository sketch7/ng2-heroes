import * as _ from "lodash";
import { Injectable } from "@angular/core";

import { AppState } from "../../app.state";
import { NotificationMessage } from "./notification.model";

@Injectable()
export class NotificationSelector {

	getAll() {
		return ($state: AppState): NotificationMessage[] => $state.notification.items;
	}

	getUnreadCount() {
		return ($state: AppState): number => _.filter(this.getAll()($state),
			x => !x.isRead)
			.length;
	}

}