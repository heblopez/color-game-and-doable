import { Pipe, PipeTransform } from '@angular/core';
import { format, parse } from 'date-fns';

@Pipe({
  name: 'dateFormated',
  standalone: true,
})
export class DateFormatedPipe implements PipeTransform {
  transform(dateStr: string, withYear: boolean = false): string {
    if (!dateStr) return '';
    const date = parse(dateStr, 'yyyy-MM-dd', new Date());
    if (withYear) return format(date, 'EEEE, MMMM d, yyyy');
    return format(date, 'EEEE, MMMM d');
  }
}
