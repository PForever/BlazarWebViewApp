import {signal, Type} from "@angular/core";
import {delay, finalize, Observable, of, pipe, switchMap, tap, UnaryFunction} from "rxjs";

export function errorAlert(error: string | Error) {
  console.error(error);
}

export function sendInfo(message: string) {
  console.info(message);
}

export function errorThrow<T>(error: string | Error): T {
  if (typeof error == 'string') {
    throw new Error(error);
  } else {
    throw error;
  }
}

export function getMapValue<TKey, TValue>(map: Map<TKey, TValue>, key: TKey) {
  const value = map.get(key);
  if (value === undefined || value === null) {
    errorThrow(`key ${JSON.stringify(key)} wasn't found in map with keys: ${JSON.stringify(Array.from(map.keys()))}`);
  }
  return value!;
}

export function getValue<T>(value: T | undefined, propertyName: string) {
  if (value === undefined || value === null) {
    errorThrow(`value of selected property ${propertyName} is null`);
  }
  return value!;
}

export function getElementTypeName<T>(value: T): string {
  return typeof value;
}

//can't copy inner array, maps
export function simpleFieldClone<TSrc, TDst>(
  src: TSrc, dst: TDst | null | undefined,
  {
    skipCollections = false,
    copyAll = false,
  }: SimpeCloneOptions = {}
): TDst {
  const typeName = (src as { constructor: { name: string } }).constructor.name;

  if (is(typeName, [Array.name, Map.name]) && !skipCollections) {
    errorThrow('Copy of collection not supported');
  }

  if (typeof src === 'object' && isNot(typeName, [Date.name])) {
    return assignDst<TSrc, TDst>(dst, copyAll, src, skipCollections);
  } else {
    return src as unknown as TDst;
  }
}

export type KeyOf<T> = T extends unknown ? unknown : T[keyof T];

export function getKeys<T extends object>(value: T) {
  return Object.keys(value) as (keyof T)[];
}

export type Recordify<T> = { [K in keyof T]: Recordify<T[K]> | null | undefined };

function assignDst<TSrc, TDst>(dst: Recordify<TDst> | null | undefined, copyAll: boolean, src: Recordify<TSrc>, skipCollections: boolean) {
  if (dst !== null && dst !== undefined) {
    for (const prop of getKeys(copyAll ? src : dst)) {
      dst[prop] = processIfLeftNotNull(
        src[prop], dst[prop],
        (s: Recordify<TSrc[typeof prop]>, d: Recordify<TDst[typeof prop]> | null | undefined) => simpleFieldClone(s, d, {
          skipCollections,
          copyAll
        })
      );
    }
  } else {
    errorThrow('Inner objects must be initialized before clone method invoked');
  }
  return (dst ?? {}) as TDst;
}

export function processIfLeftNotNull<TLeft, TRight>(
  left: TLeft | null | undefined, right: TRight | null | undefined, action: (l: TLeft, r: TRight | null | undefined) => TRight,
): TRight | null | undefined {
  if (left === null) return null;
  if (left === undefined) return undefined;
  return action(left, right);
}

export interface SimpeCloneOptions {
  skipCollections?: boolean;
  copyAll?: boolean,
}

export function is<T>(node: T, stack: T[]): boolean {
  return stack.findIndex(v => node === v) !== -1;
}

export function isNot<T>(node: T, stack: T[]): boolean {
  return stack.findIndex(v => node === v) === -1;
}

export function transform<TNode, TResultFunction>(node: TNode, func: (node: TNode) => TResultFunction) {
  func(node);
  return node;
}

type ReadonlyPropertyNames<T> = {
  [K in keyof T]: T[K] extends { readonly [P in keyof T[K]]: T[K][P] } ? K : never;
}[keyof T];

export function initializeReadonlyField<T, K extends ReadonlyPropertyNames<T>>(obj: T, fieldName: K, value: T[K]) {
  if (obj[fieldName] !== undefined && obj[fieldName] !== null) {
    throw new Error(`Field ${String(fieldName)} is already initialized.`);
  }
  (obj as { -readonly [P in K]: T[P] })[fieldName] = value;
}

type Mutable<T> = { -readonly [K in keyof T]: T[K] }
type Frozen<T> = { (): T; isInizialized: boolean; readonly init: (value: T) => T };

export function frozen<T>(initFn: (() => T) | undefined = undefined): Frozen<T> {
  let value: T;
  const accessor: Mutable<Frozen<T>> = () => {
    if (!accessor.isInizialized) {
      throw new RequiredValueError();
    }
    return value!;
  };

  if (initFn) {
    value = initFn();
    accessor.isInizialized = true;
  } else {
    accessor.isInizialized = false;
  }


  accessor.init = (newValue: T) => {
    if (accessor.isInizialized) {
      throw new FrozenValueError();
    }
    value = newValue;
    accessor.isInizialized = true;
    return newValue;
  };

  return accessor as Frozen<T>;
}

export function signalFrozen<T>(value: T | undefined = undefined): Frozen<T> {
  const valueSignal = signal<T>(value!);

  const accessor = () => {
    if (!accessor.isInizialized) {
      throw new RequiredValueError();
    }
    return valueSignal();
  };

  accessor.isInizialized = false;

  accessor.init = (newValue: T) => {
    if (accessor.isInizialized) {
      throw new FrozenValueError();
    }
    valueSignal.set(newValue);
    accessor.isInizialized = true;
    return newValue;
  };

  return accessor;
}

type Required<T> = { (): T; readonly set: (value: T) => T };

export function required<T>(value: T | undefined = undefined): Required<T> {
  let isSet = false;
  const accessor = () => {
    if (!isSet) {
      throw new RequiredValueError();
    }
    return value!;
  };

  accessor.set = (newValue: T) => {
    value = newValue;
    isSet = true;
    return newValue;
  };

  return accessor;
}

export function signalRequired<T>(value: T | undefined = undefined): Required<T> {
  const valueSignal = signal<T>(value!);
  const accessor = () => {
    if (valueSignal() === undefined) {
      throw new RequiredValueError();
    }
    return valueSignal();
  };

  accessor.set = (newValue: T) => {
    valueSignal.set(newValue);
    return newValue;
  };

  return accessor;
}

class RequiredValueError extends Error {
  public constructor() {
    super("Value is required but has not been set.");
    this.name = "RequiredValueError";
  }
}

class FrozenValueError extends Error {
  public constructor() {
    super("Value has already been set and cannot be changed.");
    this.name = "FrozenValueError";
  }
}

export function signalNullable<T>(value: T | undefined = undefined) {
  return signal<T | undefined>(value);
}

export function memoize<T extends (...args: Parameters<T>) => ReturnType<T>>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();

  return function (...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  } as T;
}

export function addPrototype<T extends object>(dto: T, type: Type<T>): T;
export function addPrototype<T extends object>(dto: T[], type: Type<T>): T[];
export function addPrototype<T extends object>(dto: T | T[], type: Type<T>): T | T[] | undefined {
  if (Array.isArray(dto)) {
    return dto.map(value => Object.setPrototypeOf(value, type.prototype));
  } else if (dto !== undefined) {
    return Object.setPrototypeOf(dto, type.prototype);
  }
  return undefined;
}

export function surround<T>(invoker: () => Observable<T>, onStart: () => void, onEnd: () => void): Observable<T> {
  return of(undefined).pipe(tap(onStart), switchMap(() => invoker()), finalize(onEnd));
}

export type PickKeyByType<Type, KeyType> = keyof { [Key in keyof Type as Type[Key] extends KeyType ? Key : never]: Key };

export const reload = <T>(stateSwitcher: (state: boolean) => void): UnaryFunction<Observable<T>, Observable<T>> =>
  pipe(tap(() => stateSwitcher(false)), delay(0), tap(() => stateSwitcher(true)));

export function tryConvertToNumber(value: string | undefined): number | undefined {
  const parsedValue = Number(value);
  if (Number.isNaN(parsedValue)) {
    return undefined;
  }
  return parsedValue;
}
