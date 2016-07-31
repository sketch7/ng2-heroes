import "rxjs/Rx";
import {provide} from "@angular/core";
import {bootstrap} from "@angular/platform-browser-dynamic";
import {HTTP_PROVIDERS, XHRBackend} from "@angular/http";
import {provideStore, combineReducers} from "@ngrx/store";
import {runEffects} from "@ngrx/effects";
import {compose} from "@ngrx/core/compose";
import {storeLogger} from "ngrx-store-logger";
import {InMemoryBackendService, SEED_DATA, InMemoryBackendConfig} from "angular2-in-memory-web-api/core";
import {LOGGER_PROVIDERS} from "ssv-ng2-core";
import {CommandConfig, CommandOptions} from "@ssv/ng2-command";

import {
	AppComponent,
	appReducer,
	MockAppData,
	USER_PROVIDERS,
	NOTIFICATION_PROVIDERS,
	HERO_PROVIDERS,
	HeroEffect,
	APP_ROUTER_PROVIDERS
} from "./app/index";

bootstrap(AppComponent, [
	APP_ROUTER_PROVIDERS,
	provideStore(
		compose(
			storeLogger(),
			combineReducers
		)(appReducer)
	),
	runEffects([HeroEffect]),
	HTTP_PROVIDERS,
	LOGGER_PROVIDERS,
	USER_PROVIDERS,
	NOTIFICATION_PROVIDERS,
	HERO_PROVIDERS,
	// in memory web api providers
	provide(XHRBackend, { useClass: InMemoryBackendService }),
	provide(SEED_DATA, { useClass: MockAppData }),
	provide(InMemoryBackendConfig, { useValue: { delay: 120 } }),
	{ provide: CommandConfig, useValue: { executingCssClass: "is-busy" } as CommandOptions }
]).catch(err => console.error(err));