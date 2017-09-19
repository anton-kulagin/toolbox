import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passedTests'
})
export class PassedTestsPipe implements PipeTransform {

  transform(value: Array<Object>, args?: any): number {
    return value.filter(testPair=>testPair['status']==="pass").length;
  }

}
