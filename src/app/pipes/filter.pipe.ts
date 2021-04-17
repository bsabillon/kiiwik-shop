import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    searchText = searchText.toLowerCase();
    if (!items) return [];
    if (!searchText) return items;


    return items.filter(it => {
      if (it.name.toLowerCase().includes(searchText)) {
        return it.name;
      } else if (it.category.name.toLowerCase().includes(searchText)) {
        return it.name;
      }
    });
  }
}
