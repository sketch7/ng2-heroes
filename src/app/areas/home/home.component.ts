import {Component} from "angular2/core";
import config from "../../app.config";

@Component({
	templateUrl: `${config.basePath}/areas/home/home.html`
})
export class HomeComponent {
	title = config.name;
}