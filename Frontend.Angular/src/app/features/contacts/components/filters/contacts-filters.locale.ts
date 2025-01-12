import {TextDictionary} from "@common/lang-system/TextDictionary";
import {ITextFactory} from "@common/menu-system/IHasTitle";


export class ContactsFilterTextFactory implements ITextFactory<ContactsFilterText> {
  public constructor() {
  }

  public getText(dictionary: TextDictionary): ContactsFilterText {
    return {
      allTextFields: dictionary.allTextFields,
      cancel: dictionary.cancel,
      apply: dictionary.apply,
      title: dictionary.filter
    };
  }
}

export interface ContactsFilterText {
  allTextFields: string;
  cancel: string;
  apply: string;
  title: string;
}

