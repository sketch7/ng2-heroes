import * as _ from "lodash";
import { Observable } from "rxjs/Observable";
import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { LoggerFactory, ILog } from "@ssv/ng2-core";

import { TerminalService, TerminalCommand } from "./terminal.service";
import { RegisterCommand, CONFIG } from "./terminal.decorator";

// changes default command name formatting when registering via decorator to use kebab casing.
CONFIG.nameFormatter = (name: string): string => _.kebabCase(name);

@Component({
	moduleId: module.id,
	selector: "app-terminal-lab-container",
	templateUrl: "terminal-lab.container.html"
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
				helpText: "get health amount",
				execute: () => console.log(`Current health is '${this.health}'`)
			})
			.register({
				name: "restore-health",
				helpText: "restore health to full",
				execute: () => this.health = 100
			})
			.register({
				name: "set-health",
				helpText: "set health to given amount e.g. 500",
				execute: value => this.health = value
			});
	}

	@RegisterCommand({ helpText: "simply add a log!" })
	simpleLog() {
		console.log("simple log!");
	}

	@RegisterCommand({ name: "reload", helpText: "reloads the window" })
	reloadWindow() {
		window.location.reload();
	}

}