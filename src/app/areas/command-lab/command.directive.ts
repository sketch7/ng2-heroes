import { Directive, OnInit, OnDestroy, Input, HostBinding, HostListener } from "@angular/core";

import {ICommand} from "./command";

@Directive({
	selector: "[command]",
})
export class CommandDirective implements OnInit, OnDestroy {

	@Input() command: ICommand;
	@HostBinding("disabled") isDisabled: boolean;

	ngOnInit() {
		console.log("[commandDirective::init]");
		this.command.canExecute$
			.do(x => {
				console.log("[commandDirective::canExecute$]", x);
				this.isDisabled = !x;
			}).subscribe();
	}

	@HostListener("click")
	onClick() {
		console.log("[commandDirective::onClick]");
		this.command.execute();
	}

	ngOnDestroy() {
		console.log("[commandDirective::destroy]");
		this.command.destroy();
	}
}