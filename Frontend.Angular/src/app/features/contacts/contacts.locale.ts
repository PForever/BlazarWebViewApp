import {TextDictionary} from "@common/lang-system/TextDictionary";
import {ITextFactory} from "@common/menu-system/IHasTitle";
import {IMenuItem} from "@common/menu-system/IMenuItem";


export class ContactsTextFactory implements ITextFactory<ContactsText> {
  public constructor() {
  }

  public getText(dictionary: TextDictionary): ContactsText {
    return {
      title: dictionary.contacts,
    };
  }

  public getTitle(dictionary: TextDictionary): ContactsMenuItem {
    return new ContactsMenuItem(dictionary);
  }
}

export interface ContactsText {
  title: string;
}

export class ContactsMenuItem implements IMenuItem {
  public icon = 'contacts';
  public title: string;

  public constructor(dictionary: TextDictionary) {
    this.title = dictionary.contacts;
  }
}

