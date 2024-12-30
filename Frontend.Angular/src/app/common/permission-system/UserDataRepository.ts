import { Injectable } from '@angular/core';
import { UserRoles } from './UserRoles';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserDataRepository {
  private readonly table = 'users';
  private readonly fakeUsers = new Map<string, UserData>([
    ['1', { id: '1', role: UserRoles.DEVELOPER, email: 'admin@admin.com' }],
    ['2', { id: '2', role: UserRoles.USER, email: 'user@x.com' }],
    ['3', { id: '3', role: UserRoles.GUEST, email: 'guest@x.com' }],
  ])
  public getAll(): Observable<UserData[]> {
    return of(Array.from(this.fakeUsers.values()))
  }
  public get(id: string) {
    return of(this.fakeUsers.get(id));
  }
  public update(value: UserData) {
    this.fakeUsers.set(value.id, value);
    return of();
  }
  public add(value: UserData) {
    this.fakeUsers.set(value.id, value);
    return of();
  }
  public delete(id: string) {
    this.fakeUsers.delete(id);
    return of();
  }
}

export interface UserData{
  id: string;
  role: UserRoles;
  email: string;
}
