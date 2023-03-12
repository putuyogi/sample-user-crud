import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    args.forEach((arg: string) => {
      if (arg !== '' && arg !== 'null') {
        value += ' ' + arg
      }
    })
    return value
  }

}
