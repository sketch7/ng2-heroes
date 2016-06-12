export interface Hero {
	key: string;
	title: string;
	caption: string;
	description: string;
	role: string;
}

export interface HeroState {
	isBusy: boolean;
	heroes: Hero[];
}