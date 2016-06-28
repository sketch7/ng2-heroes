import {provideRouter, RouterConfig} from "@angular/router";

import {
	HomeContainer,
	HeroLayoutContainer,
	HeroDetailContainer,
	HeroListContainer,
} from "./areas/index";

const heroRoutes: RouterConfig = [
	{
		path: "heroes",
		component: HeroLayoutContainer,
		children: [
			{ path: "", component: HeroListContainer },
			{ path: ":hero", component: HeroDetailContainer }
		]
	},
];

const routes: RouterConfig = [
	{ path: "", component: HomeContainer },
	...heroRoutes
];

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes)
];