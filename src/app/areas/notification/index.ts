import {NotificationAction} from "./notification.action";
import {NotificationSelector} from "./notification.selector";

export * from "./notification.action";
export * from "./notification.model";
export * from "./notification.reducer";
export * from "./notification.selector";

export const NOTIFICATION_PROVIDERS: any[] = [
	NotificationAction,
	NotificationSelector
];