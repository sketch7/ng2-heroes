import {Component} from "@angular/core";
import {OnActivate, RouteSegment, RouteTree, ROUTER_DIRECTIVES} from "@angular/router";
import consts from "../../app.const";
import {Hero} from "./hero.model";
import {HeroService} from "./hero.service";

@Component({
	selector: "my-hero-detail",
	templateUrl: `${consts.basePath}/areas/hero/hero-detail.html`,
	directives: [ROUTER_DIRECTIVES]
})
export class HeroDetailComponent implements OnActivate {

	hero: Hero;
	private key: string;

	constructor(
		private _heroService: HeroService
	) {
	}

	routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree): void {
		this.key = curr.getParam("hero");
		this.getHero(this.key);
	}

	getHero(key: string) {
		return this._heroService.getByKey(key)
			.subscribe((hero: Hero) => this.hero = hero);
	}
}