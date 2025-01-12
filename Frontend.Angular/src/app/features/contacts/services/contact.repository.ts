import {inject, Injectable} from "@angular/core";
import {DotNetService} from "@common/backend/dotnet-service";
import {Contact} from "@app/features/contacts/model/contact";

@Injectable({providedIn: 'root'})
export class ContactRepository {
  private readonly dotNetService = inject(DotNetService);

  public get(id: number) {
    return this.dotNetService.invokeMethod<Contact>("GetPerson", [id]);
  }

  public getAll() {
    return this.dotNetService.invokeMethod<Contact[]>("GetPeople");
  }

  public add(contact: Contact) {
    return this.dotNetService.invokeMethod<number>("AddPerson", [contact]);
  }

  public update(contact: Contact) {
    return this.dotNetService.invokeMethod<Contact>("UpdatePerson", [contact]);
  }

  public delete(id: number) {
    return this.dotNetService.invokeMethod<void>("DeletePerson", [id]);
  }
}

/*@Injectable({providedIn: 'root'})
export class ContactRepository {
  private readonly dotNetService = inject(DotNetService);

  public get(id: number) {
    const value = copy(this.fakeContacts.find(x => x.id === id));
    return Promise.resolve(value === undefined ? toError404<Contact>(`${id}`) : toResult(value));
  }

  public getAll() {
    return Promise.resolve(toResult(this.fakeContacts.map(copy)))
  }

  public add(contact: Contact) {
    const value = copy(contact);
    value.id = this.fakeContacts.length + 1;
    return Promise.resolve(toResult(this.fakeContacts.push(value)));
  }

  public update(contact: Contact) {
    return Promise.resolve(toResult(this.fakeContacts[this.fakeContacts.findIndex(x => x.id === contact.id)] = copy(contact)));
  }

  public delete(id: number) {
    return Promise.resolve(toResult(this.fakeContacts.splice(this.fakeContacts.findIndex(x => x.id === id), 1)));
  }

  private readonly fakeContacts: Contact[] = [
    {
      id: 1,
      created: new Date('2022-01-01T12:00:00.000Z'),
      birthDate: new Date('1990-06-15T00:00:00.000Z'),
      notes: 'Some notes',
      firstName: 'John',
      lastName: 'Doe',
      phone: 1234567890,
      address: '123 Main St'
    },
    {
      id: 2,
      created: new Date('2022-02-01T14:00:00.000Z'),
      birthDate: new Date('1995-03-20T00:00:00.000Z'),
      notes: 'More notes',
      firstName: 'Jane',
      lastName: 'Smith',
      phone: 9876543210,
      address: '456 Elm St'
    },
    {
      id: 3,
      created: new Date('2022-03-01T16:00:00.000Z'),
      birthDate: new Date('1980-09-10T00:00:00.000Z'),
      notes: 'Even more notes',
      firstName: 'Bob',
      lastName: 'Johnson',
      phone: 5551234567,
      address: '789 Oak St'
    },
    {
      id: 4,
      created: new Date('2022-04-01T18:00:00.000Z'),
      birthDate: new Date('1992-01-05T00:00:00.000Z'),
      notes: 'Some other notes',
      firstName: 'Alice',
      lastName: 'Williams',
      phone: 9012345678,
      address: '321 Pine St'
    },
    {
      id: 5,
      created: new Date('2022-05-01T20:00:00.000Z'),
      birthDate: new Date('1985-07-25T00:00:00.000Z'),
      notes: 'Yet more notes',
      firstName: 'Mike',
      lastName: 'Davis',
      phone: 1112223333,
      address: '901 Maple St'
    },
    {
      id: 6,
      created: new Date('2022-06-01T22:00:00.000Z'),
      birthDate: new Date('1998-04-15T00:00:00.000Z'),
      notes: 'More and more notes',
      firstName: 'Emma',
      lastName: 'Taylor',
      phone: 4445556666,
      address: '234 Cedar St'
    },
    {
      id: 7,
      created: new Date('2022-07-01T00:00:00.000Z'),
      birthDate: new Date('1982-10-20T00:00:00.000Z'),
      notes: 'Even more and more notes',
      firstName: 'Tom',
      lastName: 'Harris',
      phone: 7778889999,
      address: '567 Spruce St'
    },
    {
      id: 8,
      created: new Date('2022-08-01T02:00:00.000Z'),
      birthDate: new Date('1996-02-10T00:00:00.000Z'),
      notes: 'Some final notes',
      firstName: 'Lily',
      lastName: 'Martin',
      phone: 3334445555,
      address: '890 Walnut St'
    },
    {
      id: 9,
      created: new Date('2022-09-01T04:00:00.000Z'),
      birthDate: new Date('1988-05-25T00:00:00.000Z'),
      notes: 'The last notes',
      firstName: 'Sam',
      lastName: 'Brown',
      phone: 6667778888,
      address: '345 Hickory St'
    },
    {
      id: 10,
      created: new Date('2022-10-01T06:00:00.000Z'),
      birthDate: new Date('1994-08-15T00:00:00.000Z'),
      notes: 'The very last notes',
      firstName: 'Kate',
      lastName: 'White',
      phone: 9990001111,
      address: '678 Oak St'
    }
  ];

}

function copy<T>(contact: T): T {
  if (contact === undefined) return undefined!;
  return simpleFieldClone(contact, {} as T, {copyAll: true});
}*/
