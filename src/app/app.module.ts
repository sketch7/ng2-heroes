import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { compose } from "@ngrx/core/compose";
import { StoreModule, combineReducers } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { storeLogger } from "ngrx-store-logger";
import { InMemoryWebApiModule } from "angular2-in-memory-web-api";
import { CoreModule } from "@ssv/ng2-core";
import { CommandModule } from "@ssv/ng2-command";

import {
	USER_PROVIDERS,
	NOTIFICATION_PROVIDERS,
	HERO_PROVIDERS,
	HeroEffect,

	NavContainer,
	UserAreaContainer,

	HomeContainer,
	HeroFilterComponent,
	HeroLayoutContainer,
	HeroListContainer,
	HeroDetailContainer,
	LabsLayoutContainer,

	CommandLabContainer,
	TerminalLabContainer,
	TerminalComponent,
	TerminalCommandRegisterService,
	TERMINAL_PROVIDERS,
} from "./areas/index";
import {
	HeroDetailComponent,
	HeroListComponent,
	UserAreaComponent
} from "./components/index";
import { AppComponent } from "./app.component";
import { routing } from "./app.route";
import { appReducer } from "./app.reducer";
import { MockAppData } from "./app.mock-data";

@NgModule({
	imports: [
		// @angular
		BrowserModule,
		HttpModule,
		FormsModule,
		ReactiveFormsModule,
		routing,
		StoreModule.provideStore(
			compose(
				storeLogger(),
				combineReducers
			)(appReducer)
		),

		// @ssv
		CoreModule,
		CommandModule.forRoot({ executingCssClass: "is-busy" }),

		// others
		InMemoryWebApiModule.forRoot(MockAppData, { delay: 120 }),
		EffectsModule.run(HeroEffect)
	],
	declarations: [
		AppComponent,
		NavContainer,
		HeroLayoutContainer,
		HeroDetailComponent,
		HeroDetailContainer,
		HeroListComponent,
		HeroListContainer,
		HeroFilterComponent,
		UserAreaContainer,
		UserAreaComponent,
		TerminalComponent,
		TerminalLabContainer,
		HomeContainer,
		LabsLayoutContainer,
		CommandLabContainer,
	],
	bootstrap: [AppComponent],
	providers: [
		USER_PROVIDERS,
		NOTIFICATION_PROVIDERS,
		HERO_PROVIDERS,
		TERMINAL_PROVIDERS,
		TerminalCommandRegisterService
	]
})
export class AppModule {

}