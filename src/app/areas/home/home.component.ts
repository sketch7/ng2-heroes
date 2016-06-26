import {Component} from "@angular/core";
import consts from "../../app.const";

@Component({
	moduleId: module.id,
	templateUrl: "home.html"
})
export class HomeComponent {
	title = consts.name;
}