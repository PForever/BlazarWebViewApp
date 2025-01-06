import {EventEmitter, Injectable} from "@angular/core";
import {HistoryLocalStorage} from "./HistoryLocalStorage";

@Injectable({
  providedIn: 'root',
})
export class EventMessageQueue {
  public constructor(private readonly storage: HistoryLocalStorage) {
  }

  public push(level: EventMessageLevel, message: string | Error, type: SourceType = SourceType.Frontend) {
    let m;
    let e;
    if (typeof message == 'string') {
      m = message as string;
    } else {
      e = message as Error;
      m = e.message;
    }
    const eventMessage: EventMessage = {
      date: new Date(Date.now()),
      message: m,
      error: e,
      level: level,
      sourceType: type
    };

    this.pushToStorage(eventMessage);
    this._massagePushed$.emit(eventMessage);
  }

  public pushInfo(message: string, type: SourceType = SourceType.Frontend) {
    this.push(EventMessageLevel.Info, message, type);
  }

  public pushError(message: string | Error, type: SourceType = SourceType.Frontend) {
    this.push(EventMessageLevel.Error, message, type);
  }

  private pushToStorage(message: EventMessage) {
    this.storage.push(message);
  }

  private readonly _massagePushed$ = new EventEmitter<EventMessage>();
  public readonly massagePushed$ = this._massagePushed$.asObservable();
}

export interface EventMessage {
  date: Date;
  message: string;
  error?: Error;
  level: EventMessageLevel;
  sourceType: SourceType
}

export enum EventMessageLevel {
  Non, Trace, Info, Warn, Error
}

export enum SourceType {
  System, Frontend, Backend
}

