import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'localDateFormat'
})
export class LocalDateFormatPipe implements PipeTransform {

    constructor() { }

    transform(dateString: string): string {
        return new Date(dateString).toLocaleString();
    }

   
}