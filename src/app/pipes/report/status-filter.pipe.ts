import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusFilter'
})
export class StatusFilterPipe implements PipeTransform {

  transform(testPairs: Array<Object>, filter: string): Array<Object> {
    return testPairs.filter(testPairs=>testPairs['status']==filter);
  }

}
