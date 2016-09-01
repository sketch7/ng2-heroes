import "rxjs/Rx";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app/index";

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);