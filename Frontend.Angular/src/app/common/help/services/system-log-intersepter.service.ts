import {inject, Injectable} from '@angular/core';
import {EventMessageLevel, EventMessageQueue, SourceType} from "@common/help/services/EventMassageQueue";

@Injectable({
  providedIn: 'root'
})
export class SystemLogInterceptor {
  init() {
    overrideConsole(this);
  }

  private readonly eventMessageQueue = inject(EventMessageQueue);

  log(level: EventMessageLevel, message?: any, ...optionalParams: any[]): void {
    const formattedMessage = formatMessage(message, ...optionalParams);
    this.eventMessageQueue.push(level, formattedMessage, SourceType.System);
  }
}

function formatMessage(message?: any, ...optionalParams: any[]): string {
  return [message, ...optionalParams].map(param => {
    if (Array.isArray(param)) {
      return JSON.stringify(param, null, 2);
    } else if (param instanceof Error) {
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

export function overrideConsole(logService: SystemLogInterceptor): void {
  const originalConsoleLog = console.log;
  console.log = (message?: any, ...optionalParams: any[]): void => {
    originalConsoleLog.apply(console, [message, ...optionalParams]);
    logService.log(EventMessageLevel.Trace, message, ...optionalParams);
  };

  const originalConsoleError = console.error;
  console.error = (message?: any, ...optionalParams: any[]): void => {
    originalConsoleError.apply(console, [message, ...optionalParams]);
    logService.log(EventMessageLevel.Error, message, ...optionalParams);
  };
  const originalConsoleInfo = console.info;
  console.info = (message?: any, ...optionalParams: any[]): void => {
    originalConsoleInfo.apply(console, [message, ...optionalParams]);
    logService.log(EventMessageLevel.Info, message, ...optionalParams);
  };
  const originalConsoleWarn = console.warn;
  console.warn = (message?: any, ...optionalParams: any[]): void => {
    originalConsoleWarn.apply(console, [message, ...optionalParams]);
    logService.log(EventMessageLevel.Warn, message, ...optionalParams);
  };
}
