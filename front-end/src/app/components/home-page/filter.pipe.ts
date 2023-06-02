import { Pipe, PipeTransform } from '@angular/core';
import { Lot } from 'src/app/models/lot.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: Lot[], searchText: string): Lot[] {
    if (!items || !searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => item.name.toLowerCase().includes(searchText));
  }
}