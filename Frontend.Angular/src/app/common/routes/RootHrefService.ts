import {EventEmitter, Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class RootHrefService {
  private baseRoot = '/';
  private readonly observable;

  public constructor() {
    this.observable = this.baseRootChanged.asObservable();
  }

  public setBaseRoot(path: string) {
    this.baseRoot = `/${path}/`;
    this.baseRootChanged.emit(this.baseRoot);
  }

  public getBaseRoot() {
    return this.baseRoot;
  }

  public baseRootChanged = new EventEmitter<string>();

  public getBaseRootAsync() {
    return this.observable;
  }
}
