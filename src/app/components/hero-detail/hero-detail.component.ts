import {Component, Input} from "@angular/core";

import {Hero} from "../../index";

@Component({
	moduleId: module.id,
	selector: "app-hero-detail",
	templateUrl: "hero-detail.component.html"
})
export class HeroDetailComponent {

	@Input() hero: Hero;

}