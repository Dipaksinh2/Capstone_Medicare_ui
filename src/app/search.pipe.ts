import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[], searchString: any, propertyName: string): any[] {
    const result = [];
    if (value.length === 0 || searchString === '' || propertyName === '') {
      return value;
    }

    for (const item of value) {
      if (item[propertyName] === searchString) {
        result.push(item)
      }

    }
    return result;
  }

}
