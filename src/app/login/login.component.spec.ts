import { async, ComponentFixture, TestBed, tick , fakeAsync } from '@angular/core/testing';
import { AuthService } from '../auth.service';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';


@Component({
  selector: 'app-mock',
  template: '<div>Mock</div>',
  styleUrls: [],
})
export class MockComponent {

}

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [AuthService],
      imports: [RouterTestingModule.withRoutes([
         { path: 'home' , component: MockComponent }
      ]), FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component = null;
    fixture = null;
  });

  describe('LoginComponent Render Correctly', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
       });
        it('should redirect to home in case localstorage is available', () => {
         localStorage.setItem('token', 'abc');
         spyOn(component.router, 'navigate').and.callThrough();
         component.ngOnInit();
         expect(component.router.navigate).toHaveBeenCalledWith(['/home']);
         localStorage.removeItem('token');
       });
   });

  describe('LoginComponent Validation Check', () => {
        it('should check username', () => {
            component.userPassword = 'abc';
            component.isValidate();
            expect(component.userError).toBe('Username is missing');
        });

        it('should check password', () => {
          component.userName = 'abc';
          component.isValidate();
          expect(component.passwordError).toBe('Password is missing');
        });

        it('should check username and password validation', () => {
          component.isValidate();
          expect(component.userError).toBe('Username is missing');
          expect(component.passwordError).toBe('Password is missing');
        });
  });


  describe('LoginComponent Authentication service mock +ve flow', () => {
        beforeEach(() => {
          component.userName = 'a';
          component.userPassword = 'a';
          spyOn(component.auth, 'Authenticate').and.resolveTo('123');
        });

        it('should call authentication service' , () => {
          component.checkDetails();
          expect(component.auth.Authenticate).toHaveBeenCalledTimes(1);
        });
        it('should call loginSuccess', fakeAsync(() => {
          spyOn(component, 'loginSuccess');
          component.checkDetails();
          tick();
          expect(component.loginSuccess).toHaveBeenCalled();
        }));

        fit('should set token in localstorage', fakeAsync(() => {
          spyOn(component, 'loginSuccess').and.callThrough();
          spyOn(component.router, 'navigate').and.callThrough();
          component.checkDetails();
          tick();
          const token = localStorage.getItem('token');
          expect(token).toBe('123');
        }));

        it('should redirect to home page', fakeAsync(() => {
          spyOn(component.router, 'navigate').and.callThrough();
          component.checkDetails();
          tick();
          expect(component.router.navigate).toHaveBeenCalledWith(['/home']);
        }));
  });

  describe('LoginComponent Authentication service mock -ve flow', () => {
        beforeEach(() => {
          component.userName = 'a';
          component.userPassword = 'a';
          spyOn(component.auth, 'Authenticate').and.rejectWith('123');
        });

        it('should call loginFailure', fakeAsync(() => {
            spyOn(component, 'loginFailure').and.callThrough();
            component.checkDetails();
            tick();
            expect(component.loginFailure).toHaveBeenCalled();
          }));

        it('should set error', fakeAsync(() => {
            spyOn(component, 'loginFailure').and.callThrough();
            component.checkDetails();
            tick();
            expect(component.error).toBe('123');
          }));

        it('should not redirect to home page', fakeAsync(() => {
            spyOn(component, 'loginFailure').and.callThrough();
            spyOn(component.router, 'navigate').and.callThrough();
            component.checkDetails();
            tick();
            expect(component.router.navigate).not.toHaveBeenCalled();
          }));
     });
});

