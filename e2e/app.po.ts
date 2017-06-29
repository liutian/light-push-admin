import { browser, by, element } from 'protractor';

export class PushAdminPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('p-root h1')).getText();
  }
}
