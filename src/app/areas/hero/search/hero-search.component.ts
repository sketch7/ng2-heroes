import {Component, Input, Output} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Component({
	moduleId: module.id,
	selector: "app-hero-search",
	templateUrl: "hero-search.component.html",
	directives: [
	]
})
export class HeroSearchComponent {

	keyup$ = new Subject<KeyboardEvent>();

	@Input() searchTerm = "";
	@Output() search: Observable<string> = this.keyup$
		.debounceTime(300)
		.map(e => (e.target as HTMLInputElement).value)
		.distinctUntilChanged();

}