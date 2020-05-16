import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root .heading')).getText() as Promise<string>;
  }
 // User field
  getUserField(): ElementFinder {
    return element(by.css('app-login .username')) as ElementFinder;
  }

  getUserFieldValue(): Promise<string>{
    const vs =  this.getUserField();
    return vs.getAttribute('value') as Promise<string>;
  }

  setUser(data: string): void {
      const vs =  this.getUserField();
      vs.sendKeys(data);
  }
 // Password Field
  getPasswordField(): ElementFinder {
    return element(by.css('app-login .userpassword')) as ElementFinder;
  }

  getPasswordValue(): Promise<string>{
    const vs =  this.getPasswordField();
    return vs.getAttribute('value') as Promise<string>;
  }

  setPassword(data: string): void {
    const vs =  element(by.css('app-login .userpassword'));
    vs.sendKeys(data);
  }

  // Login Button functionality
  getLoginButton(): ElementFinder {
    return element(by.css('app-login .login_btn')) as ElementFinder;
  }

  // Error field
  getvalidationError(): ElementArrayFinder {
    return element.all(by.css('app-login .fieldV')) as ElementArrayFinder ;
  }

  getLoginError(): ElementFinder {
    return element(by.css('app-login .error')) as ElementFinder;
  }

  // Home page title
  getLogoutButton(): ElementFinder {
    return element(by.css('app-home .logout_btn')) as ElementFinder;
  }

  getHomePageTitle(): ElementFinder {
    return element(by.css('app-home p')) as ElementFinder;

  }

}
