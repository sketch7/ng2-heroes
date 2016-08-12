import * as _ from "lodash";
import {Injectable} from "@angular/core";

export interface TerminalCommand {
	command: string;
	helpText: string;
	execute(...args: any[]): void;
}

@Injectable()
export class TerminalService {

	private commands = new Map<string, TerminalCommand>();

	register(command: TerminalCommand): this {
		// todo: add validation
		this.commands.set(command.command, command);
		return this;
	}

	execute(command: string): void {
		let action = this.commands.get(command);
		if (!action) {
			console.log(`[terminal] Command '${command} was not found.'`);
			return;
		}
		// todo: parse + pass args
		action.execute();
	}

}