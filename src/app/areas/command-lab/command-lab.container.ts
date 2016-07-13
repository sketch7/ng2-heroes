import {Subject, Observable} from "rxjs/Rx";
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

	isExecuting$ = new Subject<boolean>();

	saveObs() {
		return Observable.timer(utils.conversion.fromSecondsToMilliseconds(2))
			.do(() => {
				this.logger.debug("saveObs", "execute complete");
			});
	}

	// using ng-command
	saveCmd: ICommand = new Command(this.saveObs.bind(this));
}

/* 
 Initial goal
 - Given the execute func is an observable
 - Given canExecute is an observable
*/