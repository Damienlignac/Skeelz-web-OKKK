import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name:`age`
})
export class AgePipe implements PipeTransform {

  transform(value: Date, ...args: any[]): any {
    let dtJour: Date = new Date();

    let age = dtJour.getFullYear() - value.getFullYear();

    return age;
  }

}
