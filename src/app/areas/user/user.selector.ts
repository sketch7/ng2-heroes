import * as _ from "lodash";
import { Injectable } from "@angular/core";

import { AppState } from "../../app.state";
import { UserState } from "./user.model";

@Injectable()
export class UserSelector {

	get() {
		return (state: AppState): UserState => state.user;
	}

}