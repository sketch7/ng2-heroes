import {Component, OnInit, OnDestroy} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import {utils} from "ssv-core";

import {AppState} from "../../app.state";
import {UserAreaComponent}  from "../../components/index";
import {NotificationSelector, NotificationAction} from "../notification/index";
import {UserSelector} from "./user.selector";
import {UserState} from "./user.model";

@Component({
	moduleId: module.id,
	selector: "app-user-area-container",
	templateUrl: "user-area.container.html",
	directives: [
		ROUTER_DIRECTIVES,
		UserAreaComponent
	]
})
export class UserAreaContainer implements OnInit, OnDestroy {

	user$: Observable<UserState>;
	unreadNotificationCount$: Observable<number>;
	private addNotificationIntervalToken: number;
	private nextNotificationIdSeed = 4;

	constructor(
		private store: Store<AppState>,
		private userSelector: UserSelector,
		private notificationSelector: NotificationSelector,
		private notificationAction: NotificationAction
	) {

	}

	ngOnInit() {
		this.user$ = this.store.select(this.userSelector.get());
		this.unreadNotificationCount$ = this.store.select(this.notificationSelector.getUnreadCount());

		this.addNotificationIntervalToken = setInterval(() => {
			this.store.dispatch(this.notificationAction.add({
				id: this.nextNotificationIdSeed,
				isRead: false,
				title: "New message!"
			}));
			this.nextNotificationIdSeed++;
		}, utils.conversion.fromSecondsToMilliseconds(6));
	}

	ngOnDestroy() {
		clearTimeout(this.addNotificationIntervalToken);
		this.addNotificationIntervalToken = null;
	}

}