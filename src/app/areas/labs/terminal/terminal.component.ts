import {Observable} from "rxjs/Observable";
import {Component, OnInit} from "@angular/core";
import {FormControl} from "@angular/forms";
import {LoggerFactory, ILog} from "@ssv/ng2-core";

import {TerminalService, TerminalCommand} from "./terminal.service";

const TAB_KEY_CODE = 9;

@Component({
	moduleId: module.id,
	selector: "ssv-terminal",
	templateUrl: "terminal.component.html"
})
export class TerminalComponent implements OnInit {

	command = new FormControl();
	commands$: Observable<TerminalCommand[]>;
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
		this.commands$ = this.command.valueChanges
			.debounceTime(300)
			.distinctUntilChanged()
			.do(x => this.commandIndex = -1)
			.map(x => this.terminalService.queryCommands(x))
			.do(x => this.commands = x);

		Observable.fromEvent<KeyboardEvent>(document, "keydown")
			.filter((x) => x.keyCode === TAB_KEY_CODE)
			.do((x) => this.logger.debug("key press#2", null, x))
			.filter(x => this.commands && this.commands.length > 0)
			.do(x => {
				x.preventDefault();
				// cycle commands
				this.commandIndex = (this.commandIndex + 1) >= this.commands.length
					? 0
					: ++this.commandIndex;
			})
			.subscribe();
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
}