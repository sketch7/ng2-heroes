import {Directive, OnInit, OnDestroy, Input, HostBinding, HostListener} from "@angular/core";
import {Subscription} from "rxjs/Subscription";

import {ICommand} from "./command";

@Directive({
	selector: "[command]",
})
export class CommandDirective implements OnInit, OnDestroy {

	@Input() command: ICommand;
	@HostBinding("disabled") isDisabled: boolean;
	@HostBinding("class.executing") isExecuting: boolean;

	private canExecute$$: Subscription;
	private isExecuting$$: Subscription;

	ngOnInit() {
		console.log("[commandDirective::init]");
		this.canExecute$$ = this.command.canExecute$
			.do(x => {
				console.log("[commandDirective::canExecute$]", x);
				this.isDisabled = !x;
			}).subscribe();
		this.isExecuting$$ = this.command.isExecuting$
			.do(x => {
				console.log("[commandDirective::isExecuting$]", x);
				this.isExecuting = x;
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
		this.canExecute$$.unsubscribe();
		this.isExecuting$$.unsubscribe();
	}
}