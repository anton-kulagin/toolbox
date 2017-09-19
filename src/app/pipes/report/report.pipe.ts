import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'report'
})
export class ReportPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
