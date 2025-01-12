import {TextDictionary} from "@common/lang-system/TextDictionary";
import {ITextFactory} from "@common/menu-system/IHasTitle";


export class ContactsEditorTextFactory implements ITextFactory<ContactsEditorText> {
  public constructor() {
  }

  public getText(dictionary: TextDictionary): ContactsEditorText {
    return {
      title: dictionary.filter,
      birthDate: dictionary.birthDate,
      notes: dictionary.notes,
      address: dictionary.address,
      phone: dictionary.phone,
      lastName: dictionary.lastName,
      firstName: dictionary.firstName,
      cancel: dictionary.cancel,
      save: dictionary.save,
      eventTypes: dictionary.eventTypes,
      age: dictionary.age,
      sex: dictionary.sex,
    };
  }
}

export interface ContactsEditorText {
  sex: string;
  age: string;
  eventTypes: string;
  cancel: string;
  save: string;
  birthDate: string;
  notes: string;
  address: string;
  phone: string;
  lastName: string;
  firstName: string;
  title: string;
}

