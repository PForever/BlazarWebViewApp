import {Injectable, signal} from "@angular/core";

@Injectable({providedIn: 'root'})
export class SideMenuService {
  private readonly _opened = signal(false);
  public get opened() {
    return this._opened();
  }

  public set opened(value) {
    this._opened.set(value);
  }
}
