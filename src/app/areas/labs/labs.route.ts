import {Routes} from "@angular/router";

import {LabsLayoutContainer} from "./layout/index";
import {TerminalLabContainer} from "./terminal/index";

export const labsRoutes: Routes = [
	{
		path: "labs",
		component: LabsLayoutContainer,
		children: [
			{ path: "", redirectTo: "terminal"},
			{ path: "terminal", component: TerminalLabContainer },
			// { path: ":hero", component: HeroDetailContainer }
		]
	},
];