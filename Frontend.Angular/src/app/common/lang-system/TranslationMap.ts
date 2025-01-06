import {LoginTextFactory} from "@common/permission-system/components/login/locale/LoginText";
import {LoginComponent} from "@common/permission-system/components/login/login.component";
import {HomeTextFactory} from "@app/features/home/locale/home.text";
import {HomeComponent} from "@app/features/home/home.component";
import {LogsTextFactory} from "@app/features/logs/locale/logs.text";
import {LogsComponent} from "@app/features/logs/logs.component";
import {MessageHistoryTextFactory} from "@app/layout/top-bar/top-bar-panel/message-history/locale/MessageHistoryText";
import {EventMessageQueueTextFactory} from "@app/layout/event-message-queue/locale/EventMessageQueueText";

export const translationMap = {
  loginComponent: {factory: new LoginTextFactory(), component: LoginComponent},
  homeComponent: {factory: new HomeTextFactory(), component: HomeComponent},
  logsComponent: {factory: new LogsTextFactory(), component: LogsComponent},
  messageHistoryComponent: {factory: new MessageHistoryTextFactory()},
  eventMessageQueueComponent: {factory: new EventMessageQueueTextFactory()},
};
