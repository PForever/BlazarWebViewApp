import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
    public transform(value: string | undefined, limit = 20, replaceSymbol = '...'): string | undefined {
        return value && value.length > limit ? value.substring(0, limit) + replaceSymbol : value;
    }
}