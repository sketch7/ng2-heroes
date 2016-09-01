import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {compose} from "@ngrx/core/compose";
import {provideStore, combineReducers} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {storeLogger} from "ngrx-store-logger";
import {InMemoryWebApiModule} from "angular2-in-memory-web-api";
import {CoreModule} from "@ssv/ng2-core";
import {CommandConfig, CommandOptions} from "@ssv/ng2-command";

import {
	USER_PROVIDERS,
	NOTIFICATION_PROVIDERS,
	HERO_PROVIDERS,
	HeroEffect,
	TERMINAL_PROVIDERS
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
		FormsModule,
		ReactiveFormsModule,
		routing,

		// @ssv
		CoreModule,

		// others
		InMemoryWebApiModule.forRoot(MockAppData, { delay: 120 }),
		EffectsModule.run(HeroEffect)
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

		// @ssv
		{ provide: CommandConfig, useValue: { executingCssClass: "is-busy" } as CommandOptions },

		USER_PROVIDERS,
		NOTIFICATION_PROVIDERS,
		HERO_PROVIDERS,
		TERMINAL_PROVIDERS,
	]
})
export class AppModule {

}