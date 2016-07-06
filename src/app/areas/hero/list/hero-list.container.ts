import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";

import {AppState} from "../../../app.state";
import {HeroListComponent} from "../../../components/index";
import {HeroFilterComponent} from "../filter/index";
import {Hero} from "../hero.model";
import {HeroSelector} from "../hero.selector";
import {HeroAction} from "../hero.action";

@Component({
	moduleId: module.id,
	selector: "app-hero-list-container",
	templateUrl: "hero-list.container.html",
	directives: [
		ROUTER_DIRECTIVES,
		HeroListComponent,
		HeroFilterComponent
	]
})
export class HeroListContainer implements OnInit {

	searchTerm$: Observable<string>;
	heroes$: Observable<Hero[]>;

	constructor(
		private store: Store<AppState>,
		private action: HeroAction,
		private selector: HeroSelector
	) {

	}

	ngOnInit() {
		this.heroes$ = this.selector.getAllWithFilter(this.store);
		this.searchTerm$ = this.store.select(this.selector.getFilter());
	}

	onFilter(term: string) {
		this.store.dispatch(this.action.filter(term));
	}
}