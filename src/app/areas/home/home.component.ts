import {Component} from "@angular/core";
import consts from "../../app.const";

@Component({
	templateUrl: `${consts.basePath}/areas/home/home.html`
})
export class HomeComponent {
	title = consts.name;
}