import {Component} from "@angular/core";

import consts from "../../app.const";

@Component({
	moduleId: module.id,
	selector: "app-nav-container",
	templateUrl: "nav.container.html"
})
export class NavContainer {
	appTitle = consts.name;
	appVersion = consts.version;
}