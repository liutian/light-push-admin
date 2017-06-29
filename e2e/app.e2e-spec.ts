import { PushAdminPage } from './app.po';

describe('push-admin App', () => {
  let page: PushAdminPage;

  beforeEach(() => {
    page = new PushAdminPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to p!!');
  });
});
