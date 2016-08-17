import * as _ from "lodash";

export interface TerminalCommand {
	// todo: implement name aliases
	name: string;
	helpText?: string;
	execute(...args: any[]): void;
}

export class TerminalService {

	private commands = new Map<string, TerminalCommand>();

	constructor() {
		this.registerInternalCommands();
	}

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

	queryCommands(commandTerm: string): TerminalCommand[] {
		const parsedCommandTerm = this.parseCommand(commandTerm);
		let commands: TerminalCommand[] = [];
		this.commands.forEach(x => {
			if (x.name.includes(parsedCommandTerm.name)) {
				commands.push(x);
			}
		});
		return commands;
	}

	private registerInternalCommands() {
		this.register({
			name: "help",
			helpText: "lists available commands",
			execute: this.helpCommand.bind(this)
		});
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

	private helpCommand() {
		console.group("Terminal Commands");
		this.commands.forEach(x => {
			console.log(`[${x.name}] ${x.helpText}`);
		});
		console.groupEnd();
	}
}

export const terminal = new TerminalService();