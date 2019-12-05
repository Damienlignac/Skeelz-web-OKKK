import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumArray'
})
export class EnumArrayPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
