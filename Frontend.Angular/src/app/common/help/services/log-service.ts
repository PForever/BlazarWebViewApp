import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
    constructor(){
        overrideConsole(this);
    }
    private logSubject = new ReplaySubject<string>(1);

    get log$(): Observable<string> {
        return this.logSubject.asObservable();
    }

    log(message?: any, ...optionalParams: any[]): void {
        console.info(optionalParams);
        console.info(JSON.stringify(optionalParams[0]));
        const formattedMessage = formatMessage(message, ...optionalParams);
        console.info(formattedMessage);
        this.logSubject.next(formattedMessage);
    }
}

function formatMessage(message?: any, ...optionalParams: any[]): string {
    return [message, ...optionalParams].map(param => {
        if (Array.isArray(param)) {
            return JSON.stringify(param, null, 2);
        } else if(param instanceof Error) {
            return JSON.stringify({
                message: param.message,
                name: param.name,
                stack: param.stack,
            });
        } else if (typeof param === 'object') {
            return JSON.stringify(param);
        } else {
            return param;
        }
    }).join(' ');
}

export function overrideConsole(logService: LogService): void {
  const originalConsoleLog = console.log;
  console.log = (message?: any, ...optionalParams: any[]): void => {
    originalConsoleLog.apply(console, [message, ...optionalParams]);
    logService.log(message, ...optionalParams);
  };

  const originalConsoleError = console.error;
  console.error = (message?: any, ...optionalParams: any[]): void => {
      originalConsoleError.apply(console, [message, ...optionalParams]);
      logService.log(message, ...optionalParams);
  };
}
