import {Component} from "@angular/core";
import {LoggerFactory, ILog} from "@ssv/ng2-core";

@Component({
	moduleId: module.id,
	selector: "app-terminal-lab-container",
	templateUrl: "terminal-lab.container.html",
	directives: [

	]
})
export class TerminalLabContainer {

	command = "";

	private logger: ILog;

	constructor(
		loggerFactory: LoggerFactory
	) {
		this.logger = loggerFactory.get("terminalLabContainer");
		this.logger.debug("ctor");
	}

	execute(): void {
		this.logger.debug("execute", "", this.command);
	}

}