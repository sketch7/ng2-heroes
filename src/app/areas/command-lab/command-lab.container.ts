import {BehaviorSubject, Observable} from "rxjs/Rx";
import {Component} from "@angular/core";
import {utils} from "ssv-core";
import {LoggerFactory, ILog} from "ssv-ng2-core";
import {CommandDirective, Command, ICommand} from "@ssv/ng2-command";


@Component({
	moduleId: module.id,
	selector: "app-command-lab-container",
	templateUrl: "command-lab.container.html",
	directives: [
		CommandDirective
	]
})
export class CommandLabContainer {

	isValid = false;
	isExecuting = false;

	isValid$ = new BehaviorSubject<boolean>(false);

	// using ng2-command
	// saveCmd: ICommand = new Command(() => {
	// 	this.logger.debug("do something", "execute complete");
	// }, this.isValid$);
	saveCmd: ICommand = new Command(this.save$.bind(this), this.isValid$, true);
	// saveCmd: ICommand = new Command(this.save$.bind(this), null, true);

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

	save$() {
		return Observable.timer(utils.conversion.fromSecondsToMilliseconds(2))
			.do(() => {
				this.logger.debug("save$", "execute complete");
			});
	}

}