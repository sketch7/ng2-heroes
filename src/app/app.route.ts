import {Routes, RouterModule} from "@angular/router";

import {
	HomeContainer,
	HeroLayoutContainer,
	HeroDetailContainer,
	HeroListContainer,
	CommandLabContainer,
} from "./areas/index";

const heroRoutes: Routes = [
	{
		path: "heroes",
		component: HeroLayoutContainer,
		children: [
			{ path: "", component: HeroListContainer },
			{ path: ":hero", component: HeroDetailContainer }
		]
	},
];

const routes: Routes = [
	{ path: "", component: HomeContainer },
	{ path: "command-lab", component: CommandLabContainer },
	...heroRoutes
];

export const routing = RouterModule.forRoot(routes);