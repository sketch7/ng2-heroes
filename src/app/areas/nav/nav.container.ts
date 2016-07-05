import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";

import consts from "../../app.const";
import {UserAreaContainer} from "../user/index";

@Component({
	moduleId: module.id,
	selector: "app-nav-container",
	templateUrl: "nav.container.html",
	directives: [
		ROUTER_DIRECTIVES,
		UserAreaContainer
	]
})
export class NavContainer {

	appTitle = consts.name;
	appVersion = consts.version;
}