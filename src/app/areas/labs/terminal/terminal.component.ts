import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl } from "@angular/forms";
import { LoggerFactory, ILog } from "@ssv/ng2-core";

import { TerminalService, TerminalCommand } from "./lib/index";

const TAB_KEY_CODE = 9;

@Component({
	moduleId: module.id,
	selector: "ssv-terminal",
	templateUrl: "terminal.component.html"
})
export class TerminalComponent implements OnInit, OnDestroy {

	command = new FormControl();
	commands$$: Subscription;
	commands: TerminalCommand[];
	commandIndex = -1;

	private logger: ILog;

	constructor(
		loggerFactory: LoggerFactory,
		private terminalService: TerminalService
	) {
		this.logger = loggerFactory.get("terminalComponent");
		this.logger.debug("ctor");
	}

	ngOnInit() {
		this.commands$$ = this.command.valueChanges
			.debounceTime(300)
			.distinctUntilChanged()
			.filter((x: string) => !this.predictedCommand || this.predictedCommand.name !== x)
			.do(() => this.commandIndex = -1)
			.map(x => this.terminalService.queryCommands(x))
			.do(x => this.commands = x)
			.do(x => this.commandIndex = this.findCommandIndex(x, this.command.value))
			.subscribe();

		Observable.fromEvent<KeyboardEvent>(document, "keydown")
			.filter((x) => x.keyCode === TAB_KEY_CODE)
			.filter(x => this.commands && this.commands.length > 0)
			.do(x => {
				x.preventDefault();
				// cycle commands
				this.commandIndex = (this.commandIndex + 1) >= this.commands.length
					? 0
					: ++this.commandIndex;
				this.command.setValue(this.predictedCommand.name);
			})
			.subscribe();
	}

	ngOnDestroy() {
		if (this.commands$$) {
			this.commands$$.unsubscribe();
		}
	}

	execute(): void {
		this.logger.debug("execute", "executing command...", this.command);
		this.terminalService.execute(this.command.value);
	}

	get predictedCommand() {
		return this.commandIndex >= 0
			? this.commands[this.commandIndex]
			: null;
	}

	private findCommandIndex(commands: TerminalCommand[], term: string) {
		return commands.map(x => x.name)
			.indexOf(term);
	}
}