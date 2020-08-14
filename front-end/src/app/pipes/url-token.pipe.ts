import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'urlToken'
})
export class UrlTokenPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const tokens = value.split('/');
    return tokens[tokens.length - 1];
  }

}
