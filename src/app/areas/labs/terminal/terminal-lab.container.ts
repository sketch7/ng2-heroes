import {Component} from "@angular/core";
import {LoggerFactory, ILog} from "@ssv/ng2-core";

import {TerminalService} from "./terminal.service";

@Component({
	moduleId: module.id,
	selector: "app-terminal-lab-container",
	templateUrl: "terminal-lab.container.html",
	directives: [

	]
})
export class TerminalLabContainer {

	health = 50;

	command = "";

	private logger: ILog;

	constructor(
		loggerFactory: LoggerFactory,
		private terminalService: TerminalService
	) {
		this.logger = loggerFactory.get("terminalLabContainer");
		this.logger.debug("ctor");

		this.terminalService
			.register({
				name: "health",
				helpText: "Get health amount",
				execute: () => console.log(`Current health is '${this.health}'`)
			})
			.register({
				name: "restore-health",
				helpText: "Restore health to full",
				execute: () => this.health = 100
			})
			.register({
				name: "set-health",
				helpText: "Set health to given amount",
				execute: (value) => this.health = value
			});
	}

	execute(): void {
		this.logger.debug("execute", "executing command...", this.command);
		this.terminalService.execute(this.command);
	}

}