import {Component, Input} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";

@Component({
	moduleId: module.id,
	selector: "app-user-area",
	templateUrl: "user-area.component.html",
	directives: [
		ROUTER_DIRECTIVES
	]
})
export class UserAreaComponent {

	@Input() unreadNotificationsCount = 0;
	@Input() alias: string;

}