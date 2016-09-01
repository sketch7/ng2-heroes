import { InMemoryDbService } from "angular2-in-memory-web-api";

import { heroes } from "./areas/index";

export class MockAppData implements InMemoryDbService {
	createDb() {
		return { heroes };
	}
}