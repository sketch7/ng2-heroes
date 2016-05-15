import {heroes} from "./areas/hero/hero";
import {InMemoryDbService} from "angular2-in-memory-web-api/core";

export class MockAppData implements InMemoryDbService {
	createDb() {
		return { heroes };
	}
}