import { HeroClient } from "./hero.client";
import { HeroService } from "./hero.service";
import { HeroAction } from "./hero.action";
import { HeroSelector } from "./hero.selector";

export * from "./hero.model";
export * from "./hero.service";
export * from "./hero.client";
export * from "./hero.reducer";
export * from "./hero.action";
export * from "./hero.effect";

export * from "./layout/index";
export * from "./detail/index";
export * from "./list/index";
export * from "./filter/index";

export * from "./hero.mock-data";

export const HERO_PROVIDERS: any[] = [
	HeroClient,
	HeroService,
	HeroAction,
	HeroSelector
];