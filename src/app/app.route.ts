import {provideRouter, RouterConfig} from "@angular/router";

import {
	HomeComponent,
	HeroLayoutContainer,
	HeroDetailContainer,
	HeroListContainer,
} from "./areas/areas";

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
	{ path: "", component: HomeComponent },
	...heroRoutes
];

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes)
];