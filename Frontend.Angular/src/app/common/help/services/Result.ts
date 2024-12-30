
export type Result<T> = ({
    readonly successeful: true;
} & SuccessResult<T>) | ({
    readonly successeful: false;
} & ErrorResult);

export interface SuccessResult<T>{
    readonly result: T;
}
export interface ErrorResult{
    readonly resultCode: 404 | 403 | 500;
    errorMessage: string;
}
