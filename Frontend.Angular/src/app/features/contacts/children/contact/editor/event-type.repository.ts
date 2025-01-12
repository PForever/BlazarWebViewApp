import {inject, Injectable} from "@angular/core";
import {DotNetService} from "@common/backend/dotnet-service";

@Injectable({providedIn: 'root'})
export class EventTypeRepository {
  private readonly dotNetService = inject(DotNetService);

  public get(id: number) {
    return this.dotNetService.invokeMethod<EventType>("GetEventType", [id]);
  }

  public getAll() {
    return this.dotNetService.invokeMethod<EventType[]>("GetEventTypes");
  }

  public add(value: EventType) {
    return this.dotNetService.invokeMethod<number>("AddEventType", [value]);
  }

  public update(value: EventType) {
    return this.dotNetService.invokeMethod<EventType>("UpdateEventType", [value]);
  }

  public delete(id: number) {
    return this.dotNetService.invokeMethod<void>("DeleteEventType", [id]);
  }
}

export interface EventType {
  id: number;
  title: string;
}
