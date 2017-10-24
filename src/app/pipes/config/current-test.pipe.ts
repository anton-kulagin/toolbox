import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currentTest'
})
export class CurrentTestPipe implements PipeTransform {

  transform(items: any[], label): any {
    //debugger;
     return label 
            ? items.filter(item => item.label == label)
            : items;
  }

}
