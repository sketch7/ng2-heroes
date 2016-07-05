import {heroesReducer, userReducer, notificationReducer} from "./areas/index";

export let appReducer = {
	hero: heroesReducer,
	user: userReducer,
	notification: notificationReducer
};

export default appReducer;