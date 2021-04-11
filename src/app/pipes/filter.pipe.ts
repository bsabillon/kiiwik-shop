import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    searchText = searchText.toLowerCase();
    if(!items) return [];
    if(!searchText) return items;
    

    return items.filter( it => {
      return it.name.toLowerCase().includes(searchText);
      
    });
}}
