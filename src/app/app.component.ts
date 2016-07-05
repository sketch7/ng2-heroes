import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {Store} from "@ngrx/store";

import {AppState} from "./app.state";
import {
	HeroAction,
	NavContainer
} from "./areas/index";

@Component({
	moduleId: module.id,
	selector: "app-heroes",
	templateUrl: "app.html",
	directives: [
		ROUTER_DIRECTIVES,
		NavContainer
	]
})
export class AppComponent implements OnInit {

	constructor(
		private store: Store<AppState>,
		private heroAction: HeroAction
	) {

	}

	ngOnInit() {
		this.store.dispatch(this.heroAction.fetchAll());
	}
}