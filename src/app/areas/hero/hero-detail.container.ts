import {Component} from "@angular/core";
import {OnActivate, RouteSegment, RouteTree, ROUTER_DIRECTIVES} from "@angular/router";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";

import {AppState} from "../../app.state";
import {HeroDetailComponent} from "../../components/components";
import {Hero} from "./hero.model";
import {HeroAction} from "./hero.action";
import {HeroSelector} from "./hero.selector";

@Component({
	moduleId: module.id,
	templateUrl: "hero-detail.container.html",
	directives: [
		ROUTER_DIRECTIVES,
		HeroDetailComponent
	]
})
export class HeroDetailContainer implements OnActivate {

	hero$: Observable<Hero>;
	private key: string;

	constructor(
		private store: Store<AppState>,
		private action: HeroAction,
		private selector: HeroSelector
	) {
	}

	routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree): void {
		this.key = curr.getParam("hero");
		this.hero$ = this.store.select<Hero>(this.selector.getByKey(this.key));
	}
}