import {Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";

import {HeroAction, NavContainer} from "./areas/index";
import {AppState} from "./app.state";

@Component({
	moduleId: module.id,
	selector: "app-heroes",
	templateUrl: "app.html",
	directives: [
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