import { TerminalService, terminal } from "./terminal.service";

export const TERMINAL_PROVIDERS: any[] = [
	{ provide: TerminalService, useValue: terminal }
];