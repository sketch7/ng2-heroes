// import "bootstrap/css/bootstrap.css!";
import "rxjs/Rx";
import {Component, OnInit, provide} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {HTTP_PROVIDERS, XHRBackend} from "@angular/http";
import {InMemoryBackendService, SEED_DATA} from "angular2-in-memory-web-api/core";

import consts from "./app.const";
import {HeroDetailComponent, HeroListComponent, HeroService, HeroClient} from "./areas/hero/hero";
import {HomeComponent} from "./areas/home/home";
import {UserInfoService} from "./areas/user/user";
import {MockHeroData} from "./areas/hero/hero";

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
		provide(SEED_DATA, { useClass: MockHeroData }),
	],
})
@RouteConfig([
	{ path: "/", name: "Home", component: HomeComponent, useAsDefault: true },
	{ path: "/heroes", name: "Heroes", component: HeroListComponent },
	{ path: "/heroes/:hero", name: "HeroDetail", component: HeroDetailComponent },
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