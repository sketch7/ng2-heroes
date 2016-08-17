import {terminal} from "./terminal.service";

export const CONFIG = {
	nameFormatter: (name: string): string => name
};

/**
 * Registers a command to the `terminal`.
 * 
 * @export
 * @param {{name?: string, helpText?: string}} params
 * @returns {MethodDecorator}
 */
export function RegisterCommand(params: { name?: string, helpText?: string }): MethodDecorator {
	return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
		terminal.register({
			name: params.name || CONFIG.nameFormatter(propertyName),
			helpText: params.helpText,
			execute: descriptor.value
		});
	};
}

