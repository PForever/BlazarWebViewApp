import {bootstrapApplication} from "@angular/platform-browser";
import {serverConfig} from "./server.app.config";
import {AppComponent} from "@app/app.component";

const bootstrap = () => bootstrapApplication(AppComponent, serverConfig);

export default bootstrap;
