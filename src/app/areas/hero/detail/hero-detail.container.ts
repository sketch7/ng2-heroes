import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {Observable, Subscription} from "rxjs/Rx";
import {LoggerFactory, ILog} from "@ssv/ng2-core";

import {AppState} from "../../../app.state";
import {Hero} from "../hero.model";
import {HeroAction} from "../hero.action";
import {HeroSelector} from "../hero.selector";

@Component({
	moduleId: module.id,
	selector: "app-hero-detail-container",
	templateUrl: "hero-detail.container.html",
})
export class HeroDetailContainer implements OnInit, OnDestroy {

	hero$: Observable<Hero>;

	private routeSubscription: Subscription;
	private logger: ILog;

	constructor(
		loggerFactory: LoggerFactory,
		private store: Store<AppState>,
		private action: HeroAction,
		private selector: HeroSelector,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.logger = loggerFactory.get("heroDetailContainer");
		this.logger.debug("ctor");
	}

	ngOnInit(): void {
		this.routeSubscription = this.route.params.subscribe(params => {
			let key = params[`hero`];
			this.hero$ = this.store.select<Hero>(this.selector.getByKey(key));
			this.logger.debug("ngOnInit", "route changed!", key);
		});
	}

	ngOnDestroy(): void {
		this.routeSubscription.unsubscribe();
	}
}