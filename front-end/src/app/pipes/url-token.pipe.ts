import {Pipe, PipeTransform} from '@angular/core';

/**
 * Filtro para obtener el último token de un URL (dividido por un slash /), por ejemplo: "https://github.com/darwinguz" retorna "darwinguz".
 * @author Darwin Guzmán
 */
@Pipe({
  name: 'urlToken'
})
export class UrlTokenPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const tokens = value.split('/');
    return tokens[tokens.length - 1];
  }

}
