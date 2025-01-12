import {TextDictionary} from "@common/lang-system/TextDictionary";
import {ITextFactory} from "@common/menu-system/IHasTitle";


export class ContactsTableTextFactory implements ITextFactory<ContactsTableText> {
  public constructor() {
  }

  public getText(dictionary: TextDictionary): ContactsTableText {
    return {
      title: dictionary.table,
      delete: dictionary.delete,
      edit: dictionary.edit,
      address: dictionary.address,
      phone: dictionary.phone,
      lastName: dictionary.lastName,
      firstName: dictionary.firstName,
      notes: dictionary.notes,
      birthDate: dictionary.birthDate,
      created: dictionary.created,
      id: dictionary.id,
      panel: dictionary.panel,
    };
  }
}

export interface ContactsTableText {
  panel: string;
  delete: string;
  edit: string;
  address: string;
  phone: string;
  lastName: string;
  firstName: string;
  notes: string;
  birthDate: string;
  created: string;
  id: string;
  title: string;
}

