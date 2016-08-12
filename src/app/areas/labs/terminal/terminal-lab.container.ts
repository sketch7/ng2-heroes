import {Observable} from "rxjs/Observable";
import {Component, OnInit} from "@angular/core";
import {FormControl} from "@angular/forms";
import {LoggerFactory, ILog} from "@ssv/ng2-core";

import {TerminalService, TerminalCommand} from "./terminal.service";

@Component({
	moduleId: module.id,
	selector: "app-terminal-lab-container",
	templateUrl: "terminal-lab.container.html"
})
export class TerminalLabContainer implements OnInit {

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

	ngOnInit() {
		this.commands$ = this.command.valueChanges
			.debounceTime(300)
			.distinctUntilChanged()
			.map(x => this.terminalService.queryCommands(x));
	}

	execute(): void {
		this.logger.debug("execute", "executing command...", this.command);
		this.terminalService.execute(this.command.value);
	}

}