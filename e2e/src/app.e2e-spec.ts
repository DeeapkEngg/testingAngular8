import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
    browser.waitForAngular();
  });

  it('should display welcome message', () => {
    expect(page.getTitleText()).toEqual('Angular Testing');
  });

  describe('testing login page', () => {
    it('should find username field', () => {
      expect(page.getUserField()).toBeDefined();
    });
    it('should find password field', () => {
      expect(page.getPasswordField()).toBeDefined();
    });
    it('should find login button field', () => {
      expect(page.getLoginButton()).toBeDefined();
    });
    it('should set value in username field', () => {
      page.setUser('abc');
      expect(page.getUserFieldValue()).toBe('abc');
    });
    it('should set value in password field', () => {
      page.setPassword('abc');
      expect(page.getPasswordValue()).toBe('abc');
    });
    it('should get username and password field error', () => {
      page.getLoginButton().click();
      expect(page.getvalidationError().get(0).getText()).toBe('Username is missing');
      expect(page.getvalidationError().get(1).getText()).toBe('Password is missing');
    });
    it('should get authentication error', () => {
      page.setUser('abc');
      page.setPassword('abc');
      page.getLoginButton().click();
      expect(page.getLoginError().getText()).toBe('Username and password is wrong');
    });
    it('should redirect to home', () => {
      page.setUser('admin');
      page.setPassword('admin');
      page.getLoginButton().click();
      browser.getCurrentUrl().then((url: string) => {
        expect((url.endsWith('home'))).toBe(true);
      });
     });
  });

  describe('Home page ', () => {
      beforeEach(() => {
        page.setUser('admin');
        page.setPassword('admin');
        page.getLoginButton().click();
      });
      it('should show Logout button', () => {
        expect(page.getLogoutButton().getText()).toBe('Logout');
      });
      it('should show title of home page', () => {
        expect(page.getHomePageTitle().getText()).toBe('home works!');
      });
      it('should redirect to home if try to access login page', () => {
          browser.get(browser.baseUrl + '/login');
          browser.getCurrentUrl().then((url: string) => {
            expect((url.endsWith('home'))).toBe(true);
          });
      });
      it('should redirect to login page whhen click on logout button', () => {
        page.getLogoutButton().click();
        browser.getCurrentUrl().then((url: string) => {
          expect((url.endsWith('login'))).toBe(true);
        });
    });
    });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    browser.executeScript('window.localStorage.clear();');
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

});
