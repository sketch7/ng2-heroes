import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";

import {AppState} from "../../app.state";
import {UserAreaComponent}  from "../../components/index";
import {NotificationSelector} from "../notification/notification.selector";
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
export class UserAreaContainer implements OnInit {

	user$: Observable<UserState>;
	unreadNotificationCount$: Observable<number>;

	constructor(
		private store: Store<AppState>,
		private userSelector: UserSelector,
		private notificationSelector: NotificationSelector
	) {

	}

	ngOnInit() {
		this.user$ = this.store.select(this.userSelector.get());
		this.unreadNotificationCount$ = this.store.select(this.notificationSelector.getUnreadCount());
	}
}