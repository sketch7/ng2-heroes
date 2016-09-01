import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Effect, Actions } from "@ngrx/effects";
import { Action } from "@ngrx/store";

import { HeroAction, heroAction } from "./hero.action";
import { HeroService } from "./hero.service";


@Injectable()
export class HeroEffect {

	@Effect() fetchAll$: Observable<Action> = this.actions$
		.ofType(heroAction.fetchAll)
		.switchMap(() => this.service.getAll()
			.map(result => this.action.fetchAllSuccess(result))
			.catch(() => Observable.of(this.action.fetchAllFail()))
		);

	constructor(
		private actions$: Actions,
		private action: HeroAction,
		private service: HeroService
	) {
	}

}