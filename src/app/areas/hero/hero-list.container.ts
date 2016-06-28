import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";

import {AppState} from "../../app.state";
import {HeroListComponent} from "../../components/components";
import {Hero} from "./hero.model";
import {HeroSelector} from "./hero.selector";

@Component({
	moduleId: module.id,
	selector: "app-hero-list-container",
	templateUrl: "hero-list.container.html",
	directives: [
		ROUTER_DIRECTIVES,
		HeroListComponent
	]
})
export class HeroListContainer implements OnInit {

	title = "Heroes";
	heroes$: Observable<Hero[]>;

	constructor(
		private store: Store<AppState>,
		private selector: HeroSelector
	) {

	}

	ngOnInit() {
		this.heroes$ = this.store.select<Hero[]>(this.selector.getAll());
	}

}