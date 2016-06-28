import {HeroClient} from "./hero.client";
import {HeroService} from "./hero.service";
import {HeroAction} from "./hero.action";
import {HeroSelector} from "./hero.selector";

export * from "./hero.model";
export * from "./hero.service";
export * from "./hero.client";
export * from "./hero.reducer";
export * from "./hero.action";
export * from "./hero.effect";

export * from "./hero-layout.container";
export * from "./hero-detail.container";
export * from "./hero-list.container";

export * from "./hero.mock-data";

export const HERO_PROVIDERS: any[] = [
	HeroClient,
	HeroService,
	HeroAction,
	HeroSelector
];