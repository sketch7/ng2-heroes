import { UserAction } from "./user.action";
import { UserSelector } from "./user.selector";

export * from "./user.action";
export * from "./user.model";
export * from "./user.reducer";
export * from "./user.selector";
export * from "./user-area.container";

export const USER_PROVIDERS: any[] = [
	UserAction,
	UserSelector
];