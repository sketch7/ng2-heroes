import {Component} from "@angular/core";

import consts from "../../app.const";
import {UserAreaContainer} from "../user/index";

@Component({
	moduleId: module.id,
	selector: "app-nav-container",
	templateUrl: "nav.container.html",
	directives: [
		UserAreaContainer
	]
})
export class NavContainer {

	appTitle = consts.name;
	appVersion = consts.version;
}