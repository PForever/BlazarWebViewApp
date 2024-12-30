import {EventEmitter, Injectable} from "@angular/core";
import {HistoryLocalStorage} from "./HistoryLocalStorage";

@Injectable({
  providedIn: 'root',
})
export class EventMessageQueue {
  public constructor(private readonly storage: HistoryLocalStorage) {
  }

  public pushInfo(message: string) {
    const eventMessage: EventMessage = {
      message: message,
      level: EventMessageLevel.Info,
    }
    this.massagePushed.emit(eventMessage);
  }

  public pushError(message: string | Error) {
    let m;
    let e;
    if (typeof message == 'string') {
      m = message as string;
    } else {
      e = message as Error;
      m = e.message;
    }
    const eventMessage: EventMessage = {message: m, error: e, level: EventMessageLevel.Error};

    this.pushToStorage(eventMessage.message);
    this.massagePushed.emit(eventMessage);
  }

  private pushToStorage(message: string) {
    this.storage.push(message);
  }

  public readonly massagePushed = new EventEmitter<EventMessage>();
}

export interface EventMessage {
  message: string;
  error?: Error;
  level: EventMessageLevel;

}

export enum EventMessageLevel {
  Non, Trace, Info, Error
}

