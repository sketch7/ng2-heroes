export interface NotificationState {
	items: NotificationMessage[];
}

export interface NotificationMessage {
	id: number;
	title: string;
	isRead: boolean;
}