import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import consts from "../../app.const";
import {Hero} from "./hero.model";
import {HeroService} from "./hero.service";

@Component({
	selector: "my-hero-list",
	templateUrl: `${consts.basePath}/areas/hero/hero-list.html`,
	directives: [ROUTER_DIRECTIVES]
})
export class HeroListComponent implements OnInit {

	title = "Heroes";
	heroes: Hero[];

	constructor(
		private _heroService: HeroService
	) {

	}

	ngOnInit() {
		this.getHeroes();
	}

	getHeroes() {
		this._heroService.getAll()
			.subscribe(x => this.heroes = x);
	}

}