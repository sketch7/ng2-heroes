import * as _ from "lodash";
import {Injectable} from "@angular/core";

export interface TerminalCommand {
	name: string;
	helpText?: string;
	execute(...args: any[]): void;
}

@Injectable()
export class TerminalService {

	private commands = new Map<string, TerminalCommand>();

	register(command: TerminalCommand): this {
		this.validate(command);
		this.commands.set(command.name, command);
		return this;
	}

	execute(commandTerm: string): void {
		if (!commandTerm) {
			return;
		}
		const parsedCommandTerm = this.parseCommand(commandTerm);
		let command = this.commands.get(parsedCommandTerm.name);
		if (!command) {
			console.log(`[terminal] Command '${commandTerm}' was not found.'`);
			return;
		}
		command.execute(parsedCommandTerm.args);
	}

	unregister(commandName: string): void {
		this.commands.delete(commandName);
	}

	private validate(command: TerminalCommand) {
		if (!command) {
			throw new Error(`[terminal] command must be defined.`);
		}
		if (!command.name) {
			throw new Error(`[terminal] command name must be defined.`);
		}
		if (typeof command.execute !== "function") {
			throw new Error(`[terminal] command name must be a function.`);
		}
		if (this.commands.has(command.name)) {
			throw new Error(`[terminal] command '${command.name}' already registered.`);
		}
	}

	private parseCommand(command: string) {
		const commandValues = command.split(" ");
		let name: string;
		let args: any[];
		[name, ...args] = commandValues;
		return {
			name,
			args
		};
	}

}