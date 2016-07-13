import {Subject, Observable} from "rxjs/Rx";

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
	// execute: () => Promise<any>;
	execute: () => any;
}

// @Injectable()
export class Command implements ICommand {

	isExecuting = false;
	canExecute: boolean;

	private canExecuteFn: () => boolean;
	private executeFn: () => Observable<any>;

	private executionPipe$ = new Subject();

	constructor(
		execute: () => Observable<any>,
		canExecute?: () => boolean
	) {
		this.executeFn = execute;
		this.canExecuteFn = canExecute;

		this.canExecute = canExecute ? canExecute() : true;

		this.executionPipe$
			.do(() => {
				console.log("[command::excutionPipe$] do#1 - set execute");
				this.isExecuting = true;
			})
			// .filter(this.canExecute)
			.switchMap(() => this.executeFn())
			.do(() => {
				console.log("[command::excutionPipe$] do#2 - set idle");
				this.isExecuting = false;
			},
			() => this.isExecuting = false,
			() => this.isExecuting = false)
			.subscribe(); // todo: dispose
	}

	execute(): any {

		if (this.isExecuting) {
			console.log("[command::execute] still executing!");
			return;
		}

		if (this.canExecute && this.canExecuteFn && !this.canExecuteFn()) {
			console.log("[command::execute] Can execute? Nope!");
			return;
		}
		// this.isExecuting = true;
		this.executionPipe$.next({});
		// this.executeFn()
		// 	.do(() => this.isExecuting = true,
		// 	() => this.isExecuting = false,
		// 	() => this.isExecuting = false)
		// 	.subscribe();

		// this.isExecuting = false;
		// .finally(() => {
		// 	this.isExecuting = false;
		// });
	}
}