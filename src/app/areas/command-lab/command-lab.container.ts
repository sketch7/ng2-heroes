import {BehaviorSubject, Observable} from "rxjs/Rx";
import {Component} from "@angular/core";
import {utils} from "ssv-core";
import {LoggerFactory, ILog} from "ssv-ng2-core";

import {ICommand, Command} from "./command";

@Component({
	moduleId: module.id,
	selector: "app-command-lab-container",
	templateUrl: "command-lab.container.html"
})
export class CommandLabContainer {

	isValid = false;
	isExecuting = false;

	private logger: ILog;

	constructor(
		loggerFactory: LoggerFactory
	) {
		this.logger = loggerFactory.get("heroDetailContainer");
		this.logger.debug("ctor");
	}

	save() {
		this.isExecuting = true;
		setTimeout(() => {
			this.isExecuting = false;
			this.logger.debug("save", "execute complete");
		}, utils.conversion.fromSecondsToMilliseconds(2));
	}

	toggleValidity(): void {
		this.isValid = !this.isValid;
	}

	toggleValidity$(): void {
		this.isValid$.next(!this.isValid$.value);
	}

	isValid$ = new BehaviorSubject<boolean>(false);

	save$() {
		return Observable.timer(utils.conversion.fromSecondsToMilliseconds(2))
			.do(() => {
				this.logger.debug("save$", "execute complete");
			});
	}

	// using ng-command
	saveCmd: ICommand = new Command(this.save$.bind(this), this.isValid$);
	// saveCmd: ICommand = new Command(this.save$.bind(this));
}

/* 
 Initial goal
 - Given the execute func is an observable
 - Given canExecute is an observable
*/