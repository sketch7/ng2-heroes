import {Component, OnInit} from "@angular/core";
import {RouteParams, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import consts from "../../app.const";
import {Hero} from "./hero.model";
import {HeroService} from "./hero.service";

@Component({
	selector: "my-hero-detail",
	templateUrl: `${consts.basePath}/areas/hero/hero-detail.html`,
	directives: [ROUTER_DIRECTIVES]
})
export class HeroDetailComponent implements OnInit {

	hero: Hero;
	private key: string;

	constructor(
		private _heroService: HeroService,
		_routeParams: RouteParams
	) {
		this.key = _routeParams.get("hero");
	}

	ngOnInit() {
		return this.getHero(this.key);
	}

	getHero(key: string) {
		return this._heroService.getByKey(key)
			.then((hero: Hero) => this.hero = hero);
	}
}