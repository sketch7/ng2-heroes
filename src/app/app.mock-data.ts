import {heroes} from "./areas/index";
import {InMemoryDbService} from "angular2-in-memory-web-api/core";

export class MockAppData implements InMemoryDbService {
	createDb() {
		return { heroes };
	}
}