import {Component, Input} from "@angular/core";

@Component({
	moduleId: module.id,
	selector: "app-user-area",
	templateUrl: "user-area.component.html",
})
export class UserAreaComponent {

	@Input() unreadNotificationsCount = 0;
	@Input() alias: string;

}