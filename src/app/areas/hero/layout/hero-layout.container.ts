import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";

import {AppState} from "../../../app.state";
import {HeroListComponent} from "../../../components/index";
import {Hero} from "../hero.model";
import {HeroSelector} from "../hero.selector";

@Component({
	moduleId: module.id,
	selector: "app-hero-layout-container",
	templateUrl: "hero-layout.container.html",
	directives: [
		ROUTER_DIRECTIVES,
		HeroListComponent
	]
})
export class HeroLayoutContainer implements OnInit {

	topHeroes$: Observable<Hero[]>;
	private TOP_HEROES_COUNT = 5;

	constructor(
		private store: Store<AppState>,
		private selector: HeroSelector
	) {

	}

	ngOnInit() {
		this.topHeroes$ = this.store.select<Hero[]>(this.selector.getAllTop(this.TOP_HEROES_COUNT));
	}
}