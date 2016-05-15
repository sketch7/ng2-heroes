import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

import {Hero} from "./hero.model";

@Injectable()
export class HeroClient {

	// private heroesUrl = "dist/app/areas/hero/mock-data.json";
	private heroesUrl = "api/heroes";

	constructor(
		private http: Http
	) {

	}

	getAll(): Observable<Hero[]> {
		return this.http.get(this.heroesUrl)
			.map(this.extractData)
			.catch(this.handleError);
	}

	private extractData(res: Response) {
		if (res.status < 200 || res.status >= 300) {
			throw new Error(`Response status: ${res.status}`);
		}
		let body = res.json();
		return body.data;
	}

	private handleError(error: any) {
		let errMsg = error.message || "Server error";
		console.error(errMsg); // log to console instead
		return Observable.throw(errMsg);
	}
}