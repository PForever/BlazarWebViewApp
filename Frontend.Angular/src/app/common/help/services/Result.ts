export type Result<T = unknown> = ({
  readonly successful: true;
} & SuccessResult<T>) | ({
  readonly successful: false;
} & ErrorResult);

export interface SuccessResult<T> {
  readonly value: T;
}

export interface ErrorResult {
  readonly resultCode: 404 | 403 | 500;
  errorMessage: string;
}

export function toError500<T>(errorMessage: string): Result<T> {
  return {
    successful: false,
    resultCode: 500,
    errorMessage: `Internal Server Error: ${errorMessage}`,
  };
}

export function toError404<T>(id: string): Result<T> {
  return {
    successful: false,
    resultCode: 404,
    errorMessage: `Not found by id: ${id}`,
  };
}


export function toResult<T>(value: T): Result<T> {
  return {
    successful: true,
    value: value,
  };
}
