import { HeroState, UserState, NotificationState } from "./areas/index";

export interface AppState {
	hero: HeroState;
	user: UserState;
	notification: NotificationState;
}