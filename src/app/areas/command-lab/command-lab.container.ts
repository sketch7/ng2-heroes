import {Component} from "@angular/core";
import {utils} from "ssv-core";
import {LoggerFactory, ILog} from "ssv-ng2-core";

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

}