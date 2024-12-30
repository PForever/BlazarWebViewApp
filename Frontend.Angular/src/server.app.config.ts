import {ApplicationConfig, mergeApplicationConfig} from "@angular/core";
import {provideServerRendering} from "@angular/platform-server";
import {appConfig} from "./app.config";

export const serverAppConfig: ApplicationConfig = {
  providers: [provideServerRendering()],
};

export const serverConfig = mergeApplicationConfig(appConfig, serverAppConfig);
