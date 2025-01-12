import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {ErrorResult, Result} from '@common/help/services/Result';
import {ErrorsComponent} from './errors/errors.component';
import {LoadingComponent} from '../loading/loading.component';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ifSuccess]'
})
export class IfSuccessDirective<T> {

  public constructor(
    private readonly templateRef: TemplateRef<IfSuccessContext<T>>,
    private readonly viewContainer: ViewContainerRef,
  ) {
  }

  private _data?: Result<T>;
  private readonly context = new IfSuccessContext<T>();
  private readonly errorContext = new IfSuccessErrorContext();

  @Input()
  public get ifSuccess(): Result<T> | undefined {
    return this._data;
  }

  public set ifSuccess(value: Result<T> | null | undefined) {
    this._data = value ?? undefined;
    if (value === null || value === undefined) { /* empty */
    } else if (value.successful) {
      this.context.$implicit = this.context.ifSuccess = value.value;
    } else {
      this.errorContext.$implicit = this.errorContext.onError = value;
    }
    this.buildView();
  }

  private _ifSuccessOnError?: TemplateRef<IfSuccessErrorContext> | undefined;
  @Input()
  public get ifSuccessOnError(): TemplateRef<IfSuccessErrorContext> | undefined {
    return this._ifSuccessOnError;
  }

  public set ifSuccessOnError(value: TemplateRef<IfSuccessErrorContext> | undefined) {
    this._ifSuccessOnError = value;
    this.buildView();
  }

  private buildView() {
    this.viewContainer.clear();
    if (this._data === undefined) {
      this.viewContainer.createComponent(LoadingComponent);
    } else if (this._data.successful) {
      this.viewContainer.createEmbeddedView(this.templateRef, this.context);
    } else {
      if (this.ifSuccessOnError) {
        this.viewContainer.createEmbeddedView(this.ifSuccessOnError, this.errorContext);
      } else {
        const error = this.viewContainer.createComponent(ErrorsComponent);
        error.setInput('result', this._data)
      }
    }
  }

  public static ngTemplateGuard_ifSuccess: 'binding';

  public static ngTemplateContextGuard<T>(
    dir: IfSuccessDirective<T>,
    ctx: unknown,
  ): ctx is IfSuccessContext<T> {
    return true;
  }
}

export class IfSuccessContext<T> {
  public $implicit: T = null!;
  public ifSuccess: T = null!;
  public ifSuccessOnError: ErrorResult = null!;
}

export class IfSuccessErrorContext {
  public $implicit: ErrorResult = null!;
  public onError: ErrorResult = null!;
}
