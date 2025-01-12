import {TextDictionary} from "@common/lang-system/TextDictionary";
import {ITextFactory} from "@common/menu-system/IHasTitle";
import {IMenuItem} from "@common/menu-system/IMenuItem";


export class LogsTextFactory implements ITextFactory<LogsText> {
  public constructor() {
  }

  public getText(dictionary: TextDictionary): LogsText {
    return {
      title: dictionary.logs,
    };
  }

  public getTitle(dictionary: TextDictionary): LogsMenuItem {
    return new LogsMenuItem(dictionary);
  }
}

export interface LogsText {
  title: string;
}

export class LogsMenuItem implements IMenuItem {
  public icon = 'log';
  public title: string;

  public constructor(dictionary: TextDictionary) {
    this.title = dictionary.logs;
  }
}

