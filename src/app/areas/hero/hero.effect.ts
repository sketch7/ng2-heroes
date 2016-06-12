import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Effect, StateUpdates} from "@ngrx/effects";
import {Action} from "@ngrx/store";

import {AppState} from "../../app.state";
import {HeroAction, heroAction} from "./hero.action";
import {HeroService} from "./hero.service";


@Injectable()
export class HeroEffect {

	@Effect() fetchAll$: Observable<Action> = this.updates$
		.whenAction(heroAction.fetchAll)
		.switchMap(() => this.service.getAll()
			.map(result => this.action.fetchAllSuccess(result))
			.catch(() => Observable.of(this.action.fetchAllFail()))
		);

	constructor(
		private updates$: StateUpdates<AppState>,
		private action: HeroAction,
		private service: HeroService
	) {
	}

}