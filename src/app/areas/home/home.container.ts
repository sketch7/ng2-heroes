import {Component} from "@angular/core";
import consts from "../../app.const";

@Component({
	moduleId: module.id,
	selector: "app-home-container",
	templateUrl: "home.html"
})
export class HomeContainer {
	title = consts.name;
}