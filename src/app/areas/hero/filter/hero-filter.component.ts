import {Component, Input, Output} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Component({
	moduleId: module.id,
	selector: "app-hero-filter",
	templateUrl: "hero-filter.component.html"
})
export class HeroFilterComponent {

	keyup$ = new Subject<KeyboardEvent>();

	@Input() searchTerm = "";
	@Output() search: Observable<string> = this.keyup$
		.debounceTime(300)
		.map(e => (e.target as HTMLInputElement).value)
		.distinctUntilChanged();

}