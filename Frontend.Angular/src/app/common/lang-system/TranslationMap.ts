import {LoginTextFactory} from "@common/permission-system/components/login/login.locale";
import {LoginComponent} from "@common/permission-system/components/login/login.component";
import {HomeTextFactory} from "@app/features/home/home.locale";
import {HomeComponent} from "@app/features/home/home.component";
import {LogsTextFactory} from "@app/features/logs/logs.locale";
import {LogsComponent} from "@app/features/logs/logs.component";
import {MessageHistoryTextFactory} from "@app/layout/top-bar/top-bar-panel/message-history/locale/MessageHistoryText";
import {EventMessageQueueTextFactory} from "@app/layout/event-message-queue/locale/EventMessageQueueText";
import {ContactsTextFactory} from "@app/features/contacts/contacts.locale";
import {ContactTextFactory} from "@app/features/contacts/children/contact/contact.locale";
import {ContactsComponent} from "@app/features/contacts/contacts.component";
import {ContactComponent} from "@app/features/contacts/children/contact/contact.component";
import {ContactsFilterTextFactory} from "@app/features/contacts/components/filters/contacts-filters.locale";
import {ContactsTableTextFactory} from "@app/features/contacts/components/table/contacts-table.locale";
import {ContactsPanelTextFactory} from "@app/features/contacts/components/panel/contacts-panel.locale";
import {ContactsEditorTextFactory} from "@app/features/contacts/children/contact/editor/contacts-editor.locale";

export const translationMap = {
  login: {factory: new LoginTextFactory(), component: LoginComponent},
  home: {factory: new HomeTextFactory(), component: HomeComponent},
  logs: {factory: new LogsTextFactory(), component: LogsComponent},
  messageHistory: {factory: new MessageHistoryTextFactory()},
  eventMessageQueue: {factory: new EventMessageQueueTextFactory()},
  contacts: {factory: new ContactsTextFactory(), component: ContactsComponent},
  contact: {factory: new ContactTextFactory(), component: ContactComponent},
  contactsFilter: {factory: new ContactsFilterTextFactory},
  contactsTable: {factory: new ContactsTableTextFactory()},
  contactsPanel: {factory: new ContactsPanelTextFactory()},
  contactsEditor: {factory: new ContactsEditorTextFactory()},
};
