import {afterNextRender, inject, Injectable} from '@angular/core';
import invokeMethodAsync from 'assets/scripts/dotnet-interopt';
import {EventMessageLevel, EventMessageQueue, SourceType} from "@common/help/services/EventMassageQueue";
import {Result, toError500, toResult} from "@common/help/services/Result";

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

  dialPhoneNumber(phoneNumber: string) {
    return this.invokeMethod<void>("DialPhoneNumber", [phoneNumber]);
  }

  getDelay() {
    return this.invokeMethod<string>("GetDelay");
  }

  getContacts() {
    return this.invokeMethod<string[]>("GetContacts");
  }

  addNote(name: string, value: string) {
    return this.invokeMethod<string>("AddNote", [name, value]);
  }

  getNotes() {
    return this.invokeMethod<{ created: Date, name: string, value: string }[]>("GetNotes");
  }

  async invokeMethod<T>(method: string, parameters: unknown[] = [], catchError?: (e: unknown) => Result<T>): Promise<Result<T>> {
    try {
      this.eventMessageQueue.push(EventMessageLevel.Trace, `invoked method: ${method}, parameters: ${JSON.stringify(parameters)}`, SourceType.Backend);
      const result = await invokeMethodAsync<T>(method, ...parameters);
      return toResult(result);
    } catch (e) {
      if (catchError) return catchError(e);
      const message = `${e}`;
      this.eventMessageQueue.push(EventMessageLevel.Error, message, SourceType.Backend);
      return toError500<T>(message);
    }
  }
}



