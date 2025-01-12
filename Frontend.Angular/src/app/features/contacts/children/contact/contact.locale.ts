import {TextDictionary} from "@common/lang-system/TextDictionary";
import {ITextFactory} from "@common/menu-system/IHasTitle";
import {IMenuItem} from "@common/menu-system/IMenuItem";


export class ContactTextFactory implements ITextFactory<ContactText> {
  public constructor() {
  }

  public getText(dictionary: TextDictionary): ContactText {
    return {
      title: dictionary.contact,
    };
  }

  public getTitle(dictionary: TextDictionary): ContactMenuItem {
    return new ContactMenuItem(dictionary);
  }
}

export interface ContactText {
  title: string;
}

export class ContactMenuItem implements IMenuItem {
  public icon = 'contact';
  public title: string;

  public constructor(dictionary: TextDictionary) {
    this.title = dictionary.contact;
  }
}

