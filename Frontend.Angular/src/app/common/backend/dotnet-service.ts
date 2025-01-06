import {afterNextRender, inject, Injectable} from '@angular/core';
import invokeMethodAsync from 'assets/scripts/dotnet-interopt';
import {EventMessageLevel, EventMessageQueue, SourceType} from "@common/help/services/EventMassageQueue";

@Injectable({
  providedIn: 'root'
})
export class DotNetService {

  private readonly eventMessageQueue = inject(EventMessageQueue);

  constructor() {
    afterNextRender(() => {
      (window as any).handleError = (message: string) => {
        this.onError(message);
      }
    });
  }

  private onError(message: string) {
    this.eventMessageQueue.pushError(message, SourceType.Backend);
  }

  getDeviceInfo() {
    return this.invokeMethod<string>("GetDeviceInfo");
  }

  getDelay() {
    return this.invokeMethod<string>("GetDelay");
  }

  getContacts() {
    return this.invokeMethod<string[]>("GetContacts");
  }

  addNote(name: string, value: string) {
    return this.invokeMethod<string>("AddNote", name, value);
  }

  getNotes() {
    return this.invokeMethod<{ created: Date, name: string, value: string }[]>("GetNotes");
  }

  invokeMethod<T>(method: string, ...parameters: string[]) {
    // console.log('invoked method: ', method, parameters);
    this.eventMessageQueue.push(EventMessageLevel.Trace, `invoked method: ${method}`, SourceType.Backend);
    return invokeMethodAsync<T>(method, ...parameters);
  }
}



