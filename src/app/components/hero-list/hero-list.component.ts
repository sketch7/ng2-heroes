import { Component, Input } from "@angular/core";

import { Hero } from "../../index";

@Component({
	moduleId: module.id,
	selector: "app-hero-list",
	templateUrl: "hero-list.component.html"
})
export class HeroListComponent {

	@Input() heroes: Hero[];
	@Input() hideThumbnail: boolean;
}