import {resource, ResourceOptions, signal} from "@angular/core";

export function lazyResource<TResource, TRequest>(options: ResourceOptions<TResource, TRequest>) {
  let initialized = signal(false);
  const oldRequest = options.request;
  options.request = () => {
    if (!initialized()) {
      return undefined!;
    }
    return oldRequest ? oldRequest() : null as TRequest;
  }
  const result = resource(options);
  const reload = result.reload.bind(result);
  result.reload = () => {
    initialized.set(true);
    return reload();
  }
  return result;
}
