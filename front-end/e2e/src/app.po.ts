import {browser, by, element, ElementFinder} from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTextoTitulo(): Promise<string> {
    return element(by.tagName('p-card')).getAttribute('header') as Promise<string>;
  }
}
