import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fillter'
})
export class FillterPipe implements PipeTransform {

  transform(notes: any[], term: string): any[] {

    return notes.filter(note => note.title.toLowerCase().includes(term.toLowerCase()));

  }

}
