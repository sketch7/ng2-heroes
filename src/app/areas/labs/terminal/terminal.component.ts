import {Observable} from "rxjs/Observable";
import {Component, OnInit} from "@angular/core";
import {FormControl} from "@angular/forms";
import {LoggerFactory, ILog} from "@ssv/ng2-core";

import {TerminalService, TerminalCommand} from "./terminal.service";

@Component({
	moduleId: module.id,
	selector: "ssv-terminal",
	templateUrl: "terminal.component.html"
})
export class TerminalComponent implements OnInit {

	command = new FormControl();
	commands$: Observable<TerminalCommand[]>;

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
			.map(x => this.terminalService.queryCommands(x));
	}

	execute(): void {
		this.logger.debug("execute", "executing command...", this.command);
		this.terminalService.execute(this.command.value);
	}

}