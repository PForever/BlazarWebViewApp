import {TextDictionary} from "@common/lang-system/TextDictionary";
import {ITextFactory} from "@common/menu-system/IHasTitle";


export class ContactsPanelTextFactory implements ITextFactory<ContactsPanelText> {
  public constructor() {
  }

  public getText(dictionary: TextDictionary): ContactsPanelText {
    return {
      title: dictionary.panel,
      add: dictionary.add

    };
  }
}

export interface ContactsPanelText {
  title: string;
  add: string;
}

