import {inject, Injectable, signal} from "@angular/core";
import {User} from "./User";
import {BehaviorSubject, map, Observable, of, tap} from "rxjs";
import {ISignInData} from "./ISignInData";
import {UserRoles} from "./UserRoles";
import {UserData, UserDataRepository} from "./UserDataRepository";

@Injectable({providedIn: 'root'})
export class UserService {

  private readonly userData = inject(UserDataRepository);

  public singIn(signIndata: ISignInData) {
    return getUser(signIndata).pipe(
      map(u => toUser(u)),
      tap(u => this.currentUser = u));
  }

  public singOut() {
    return of(signOut()).pipe(tap(() => this.currentUser = undefined));
  }

  private readonly _currentUser = signal<User | undefined>(undefined);
  // private readonly _currentUser$ = new ReplaySubject<User | undefined>(1);
  private readonly _currentUser$ = new BehaviorSubject<User | undefined>(undefined);
  public readonly currentUser$ = this._currentUser$.asObservable();

  public get currentUser() {
    return this._currentUser();
  }

  private set currentUser(value) {
    this._currentUser.set(value);
    this._currentUser$?.next(value);
  }
}

@Injectable({providedIn: 'root'})
export class PermissionService {
  private readonly userService = inject(UserService);

  public isPermit(requiredRole: UserRoles) {
    return this.userService.currentUser$.pipe(
      map(u => u?.roles ?? UserRoles.GUEST),
      map(r => {
        return {isPermited: r >= requiredRole}
      }));
  }

  public isPublic() {
    return this.isPermit(UserRoles.USER);
  }
}

function toUser(u: UserData | undefined): User | undefined {
  if (u === undefined) return undefined;
  return {id: u.id, userName: u.email, description: '', password: '', roles: u.role};
}

//TODO Implemnt your auth code
function getUser(signIndata: ISignInData): Observable<UserData> {
  return of({
    id: '1',
    email: signIndata.email,
    role: UserRoles.DEVELOPER,
  });
}

function signOut(): Observable<void> {
  return of();
}

