import {Component, Input} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";

import {Hero} from "../../index";

@Component({
	moduleId: module.id,
	selector: "app-hero-list",
	templateUrl: "hero-list.component.html",
	directives: [
		ROUTER_DIRECTIVES
	]
})
export class HeroListComponent {

	@Input() heroes: Hero[];
	@Input() hideThumbnail: boolean;
}