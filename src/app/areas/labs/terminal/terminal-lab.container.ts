import * as _ from "lodash";
import { Observable } from "rxjs/Observable";
import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { LoggerFactory, ILog } from "@ssv/ng2-core";

import { TerminalService, TerminalCommand } from "./lib/index";

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
	}

}