import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {Subject} from "rxjs/Subject";

export interface ICommand {
	/**
	 * Determines whether the command is currently executing.
	 */
	isExecuting: boolean;
	/**
	 * Determines whether the command can execute or not.
	 */
	canExecute: boolean;
	/**
	 * Executes the command function.
	 */
	execute: () => void;
}

export class Command implements ICommand {

	isExecuting = false;
	canExecute: boolean;

	private executionPipe$ = new Subject<{}>();
	private isExecuting$ = new Subject<boolean>();
	private isExecuting$$: Subscription;
	private canExecute$$: Subscription;
	private executionPipe$$: Subscription;
	private executeCombined$$: Subscription;

	constructor(
		execute: () => Observable<any>,
		canExecute?: Observable<boolean>
	) {

		if (canExecute) {
			this.canExecute$$ = canExecute
				.do(x => {
					console.log("[command::canExecute$] do trigger!");
					this.canExecute = x;
				})
				.subscribe();

			this.executeCombined$$ = Observable.combineLatest(
				this.isExecuting$,
				canExecute
				, (isExecuting, canExecuteResult) => {
					console.log("[command::combineLatest$] update!");
					this.canExecute = !isExecuting && canExecuteResult;
					return this.canExecute;
				}).subscribe();

			this.isExecuting$.do(x => this.isExecuting = x);
		} else {
			this.canExecute = true;
			this.isExecuting$$ = this.isExecuting$.do(x => {
				this.isExecuting = x;
				this.canExecute = !x;
			}).subscribe();
		}

		this.executionPipe$$ = this.executionPipe$
			.filter(() => this.canExecute)
			.do(() => {
				console.log("[command::excutionPipe$] do#1 - set execute");
				this.isExecuting$.next(true);
			})
			.switchMap(() => execute())
			.do(() => {
				console.log("[command::excutionPipe$] do#2 - set idle");
				this.isExecuting$.next(false);
			},
			() => {
				console.log("[command::excutionPipe$] do#2 error - set idle");
				this.isExecuting$.next(false);
			})
			.subscribe();
	}

	execute() {
		this.executionPipe$.next({});
	}

	destroy() {
		if (!this.executeCombined$$) {
			this.executeCombined$$.unsubscribe();
		}
		if (!this.executionPipe$$) {
			this.executionPipe$$.unsubscribe();
		}
		if (!this.canExecute$$) {
			this.canExecute$$.unsubscribe();
		}
		if (!this.isExecuting$$) {
			this.isExecuting$$.unsubscribe();
		}
		if (!this.isExecuting$) {
			this.isExecuting$.complete();
		}
	}
}