import {Injectable} from '@angular/core';
import invokeMethodAsync from 'assets/scripts/dotnet-interopt';
import {from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DotNetService {

  getDeviceInfo() {
    return invokeMethod<string>("GetDeviceInfo");
  }

  getDelay() {
    return invokeMethod<string>("GetDelay");
  }

  getContacts() {
    return invokeMethod<string[]>("GetContacts");
  }
}


function invokeMethod<T>(method: string) {
  console.log('invoked method: ', method);
  return from(invokeMethodAsync<T>(method));
}
