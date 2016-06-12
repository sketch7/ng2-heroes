import {Component, Input} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";

import {Hero} from "../../app";

@Component({
	moduleId: module.id,
	selector: "app-hero-detail",
	templateUrl: "hero-detail.component.html",
	directives: [
		ROUTER_DIRECTIVES
	]
})
export class HeroDetailComponent {

	@Input() hero: Hero;

}