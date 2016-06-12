// import "bootstrap/css/bootstrap.css!";

import {Component, OnInit} from "@angular/core";
import {Routes, ROUTER_DIRECTIVES} from "@angular/router";
import {Store} from "@ngrx/store";

import consts from "./app.const";
import {AppState} from "./app.state";
import {
	HeroAction,
	HeroDetailContainer,
	HeroListContainer,
	HomeComponent,
	UserInfoService,
} from "./areas/areas";

@Component({
	selector: "app-heroes",
	templateUrl: `${consts.basePath}/app.html`,
	directives: [
		ROUTER_DIRECTIVES
	]
})
@Routes([
	{ path: "/", component: HomeComponent }, // useAsDefault: true
	{ path: "/heroes", component: HeroListContainer },
	{ path: "/hero/:hero", component: HeroDetailContainer },
])
export class AppComponent implements OnInit {

	appTitle = consts.name;
	appVersion = consts.version;
	unreadNotificationsCount = 3;
	user: string;

	constructor(
		private store: Store<AppState>,
		private heroAction: HeroAction,
		private userInfoService: UserInfoService
	) {

	}

	ngOnInit() {
		this.store.dispatch(this.heroAction.fetchAll());
		this.user = this.userInfoService.alias;
	}
}