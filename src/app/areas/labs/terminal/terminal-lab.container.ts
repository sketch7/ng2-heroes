import {Observable} from "rxjs/Observable";
import {Component} from "@angular/core";
import {FormControl} from "@angular/forms";
import {LoggerFactory, ILog} from "@ssv/ng2-core";

import {TerminalService, TerminalCommand} from "./terminal.service";
import {TerminalComponent} from "./terminal.component";

@Component({
	moduleId: module.id,
	selector: "app-terminal-lab-container",
	templateUrl: "terminal-lab.container.html",
	directives: [
		TerminalComponent
	]
})
export class TerminalLabContainer {

	health = 50;

	command = new FormControl();
	commands$: Observable<TerminalCommand[]>;

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
				helpText: "Set health to given amount e.g. 500",
				execute: value => this.health = value
			})
			.register({
				name: "reload",
				helpText: "reloads the window",
				execute: () => window.location.reload()
			});
	}

}