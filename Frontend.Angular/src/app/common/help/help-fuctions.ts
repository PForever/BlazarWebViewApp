export function log<T>(value: T) {
  console.info(value);
  return value;
}

export function errorAlert(error: string | Error) {
  console.error(error);
  return undefined;
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
export function getKeys<T extends object>(value: T){
  return Object.keys(value) as (keyof T)[];
}
export type Recordify<T> = { [K in keyof T] : Recordify<T[K]> | null | undefined };
function assignDst<TSrc, TDst>(dst: Recordify<TDst> | null | undefined, copyAll: boolean, src: Recordify<TSrc>, skipCollections: boolean) {
  if (dst !== null && dst !== undefined) {
    for(const prop of getKeys(copyAll ? src : dst)){
      dst[prop] = processIfLeftNotNull(
        src[prop], dst[prop],
        (s: Recordify<TSrc[typeof prop]>, d: Recordify<TDst[typeof prop]> | null | undefined) => simpleFieldClone(s, d, { skipCollections, copyAll })
      );
    }
  } else {
    errorThrow('Inner objects must be initialized before clone method invoked');
  }
  return (dst ?? {}) as TDst;
}

export function processIfLeftNotNull<TLeft, TRight>(
  left: TLeft | null | undefined, right: TRight | null | undefined, action: (l: TLeft, r: TRight | null | undefined) => TRight,
  ) : TRight | null | undefined {
  if(left === null) return null ;
  if(left === undefined) return undefined;
  return action(left, right);
}

export interface SimpeCloneOptions{
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

export function toBase64(file: File, callback: (result: string) => void) {

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    callback(reader.result!.toString());
  };
  reader.onerror = function (error) {
    console.error('Error: ', error);
  };
}