import { Pipe, PipeTransform } from '@angular/core'
import * as moment from 'moment'

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    return moment().diff(value, 'years', false) + ' years old'
  }

}
