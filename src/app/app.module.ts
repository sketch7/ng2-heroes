import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule, XHRBackend} from "@angular/http";
import {compose} from "@ngrx/core/compose";
import {provideStore, combineReducers} from "@ngrx/store";
import {runEffects} from "@ngrx/effects";
import {storeLogger} from "ngrx-store-logger";
import {InMemoryBackendService, SEED_DATA, InMemoryBackendConfig} from "angular2-in-memory-web-api/core";
import {CoreModule} from "@ssv/ng2-core";
import {CommandConfig, CommandOptions} from "@ssv/ng2-command";

import {
	USER_PROVIDERS,
	NOTIFICATION_PROVIDERS,
	HERO_PROVIDERS,
	HeroEffect
} from "./areas/index";
import {AppComponent} from "./app.component";
import {routing} from "./app.route";
import {appReducer} from "./app.reducer";
import {MockAppData} from "./app.mock-data";

@NgModule({
	imports: [
		// @angular
		BrowserModule,
		HttpModule,
		routing,
		// @ssv
		CoreModule
	],
	declarations: [
		AppComponent
	],
	bootstrap: [AppComponent],
	providers: [
		provideStore(
			compose(
				storeLogger(),
				combineReducers
			)(appReducer)
		),
		runEffects([HeroEffect]),

		// in memory web api providers
		{ provide: XHRBackend, useClass: InMemoryBackendService },
		{ provide: SEED_DATA, useClass: MockAppData },
		{ provide: InMemoryBackendConfig, useValue: { delay: 120 } },

		// @ssv
		{ provide: CommandConfig, useValue: { executingCssClass: "is-busy" } as CommandOptions },

		USER_PROVIDERS,
		NOTIFICATION_PROVIDERS,
		HERO_PROVIDERS,

	]
})
export class AppModule {

}