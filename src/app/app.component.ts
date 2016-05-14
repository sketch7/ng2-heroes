// import "bootstrap/css/bootstrap.css!";
import {Component, OnInit} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import config from "./app.config";
import {HeroDetailComponent, HeroListComponent, HeroService} from "./areas/hero/hero";
import {HomeComponent} from "./areas/home/home";
import {UserInfoService} from "./areas/user/user";

@Component({
	selector: "app-heroes",
	templateUrl: `${config.basePath}/app.html`,
	directives: [HeroDetailComponent, HeroListComponent, HomeComponent, ROUTER_DIRECTIVES],
	providers: [HeroService, UserInfoService],
})
@RouteConfig([
	{ path: "/", name: "Home", component: HomeComponent, useAsDefault: true },
	{ path: "/heroes", name: "Heroes", component: HeroListComponent },
	{ path: "/heroes/:hero", name: "HeroDetail", component: HeroDetailComponent },
])
export class AppComponent implements OnInit {

	title = config.name;
	appVersion = config.version;
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