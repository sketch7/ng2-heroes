// import "bootstrap/css/bootstrap.css!";
import "rxjs/Rx";
import {Component, OnInit, provide} from "@angular/core";
import {Routes, ROUTER_DIRECTIVES} from "@angular/router";
import {HTTP_PROVIDERS, XHRBackend} from "@angular/http";
import {InMemoryBackendService, SEED_DATA, InMemoryBackendConfig} from "angular2-in-memory-web-api/core";
import {LOGGER_PROVIDERS} from "ssv-ng2-core";

import consts from "./app.const";
import {HeroDetailComponent, HeroListComponent, HeroService, HeroClient} from "./areas/hero/hero";
import {HomeComponent} from "./areas/home/home";
import {UserInfoService} from "./areas/user/user";
import {MockAppData} from "./app.mock-data";

@Component({
	selector: "app-heroes",
	templateUrl: `${consts.basePath}/app.html`,
	directives: [
		HeroDetailComponent,
		HeroListComponent,
		HomeComponent,
		ROUTER_DIRECTIVES
	],
	providers: [
		HeroService,
		UserInfoService,
		HeroClient,
		HTTP_PROVIDERS,
		// in memory web api providers
		provide(XHRBackend, { useClass: InMemoryBackendService }),
		provide(SEED_DATA, { useClass: MockAppData }),
		provide(InMemoryBackendConfig, { useValue: { delay: 120 } }),
		LOGGER_PROVIDERS
	],
})
@Routes([
	{ path: "/", component: HomeComponent }, // useAsDefault: true
	{ path: "/heroes", component: HeroListComponent },
	{ path: "/hero/:hero", component: HeroDetailComponent },
])
export class AppComponent implements OnInit {

	appTitle = consts.name;
	appVersion = consts.version;
	unreadNotificationsCount = 3;
	user: string;

	constructor(
		private _userInfoService: UserInfoService
	) {

	}

	ngOnInit() {
		this.user = this._userInfoService.alias;
	}
}