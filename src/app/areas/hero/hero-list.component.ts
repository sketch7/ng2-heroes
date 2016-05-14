import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import config from "../../app.config";
import {Hero} from "./hero.model";
import {HeroService} from "./hero.service";

@Component({
	selector: "my-hero-list",
	templateUrl: `${config.basePath}/areas/hero/hero-list.html`,
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
			.then((x: Hero[]) => this.heroes = x);
	}

}