import * as _ from "lodash";
import { Injectable } from "@angular/core";
import { LoggerFactory, ILog } from "@ssv/ng2-core";

import { TerminalService, registerCommand, CONFIG } from "./lib/index";

// changes default command name formatting when registering via decorator to use kebab casing.
CONFIG.nameFormatter = (name: string): string => _.kebabCase(name);

@Injectable()
export class TerminalCommandRegisterService {

	private health = 50;
	private logger: ILog;

	constructor(
		private loggerFactory: LoggerFactory,
		private terminalService: TerminalService
	) {
		this.logger = loggerFactory.get("terminalCommandRegisterService");
		this.logger.debug("ctor");
	}

	registerCommands() {
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


	@registerCommand({ helpText: "simply add a log!" })
	simpleLog() {
		console.log("simple log!");
	}

	@registerCommand({ name: "reload", helpText: "reloads the window" })
	reloadWindow() {
		window.location.reload();
	}

}