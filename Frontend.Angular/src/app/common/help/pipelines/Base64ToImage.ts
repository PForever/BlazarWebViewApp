import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Pipe({ name: 'base64toImage' })
export class Base64ToImage implements PipeTransform {
    private readonly _sanitizer = inject(DomSanitizer);
    public transform(value: string | undefined): SafeResourceUrl | undefined {
        return value === undefined ? undefined : this._sanitizer.bypassSecurityTrustResourceUrl(value);
    }
}

@Pipe({ name: 'base64toStyle' })
export class Base64ToStyle implements PipeTransform {
    private readonly _sanitizer = inject(DomSanitizer);
    public transform(value: string | undefined): SafeResourceUrl | undefined {
        return value === undefined ? undefined : this._sanitizer.bypassSecurityTrustStyle(`url("${value}")`);
    }
}
