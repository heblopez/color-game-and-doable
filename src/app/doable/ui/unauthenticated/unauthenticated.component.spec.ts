import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UnauthenticatedComponent } from './unauthenticated.component';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { HttpClient, HttpHandler, provideHttpClient } from '@angular/common/http';

describe('UnauthenticatedComponent', () => {
  let component: UnauthenticatedComponent;
  let fixture: ComponentFixture<UnauthenticatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnauthenticatedComponent, ButtonComponent],
      providers: [ provideHttpClient(), HttpHandler ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnauthenticatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Auth Form', () => {
    it('should render auth form with inputs and button', () => {
      const compiled = fixture.debugElement;
      expect(compiled.query(By.css('form'))).toBeTruthy();
      expect(compiled.query(By.css('#email'))).toBeTruthy();
      expect(compiled.query(By.css('#password'))).toBeTruthy();
      expect(compiled.query(By.css('button'))).toBeTruthy();
    });
  })

  describe('Tabs', () => {
    it('should render tabs with Login and Signup', () => {
      const compiled = fixture.debugElement;
      expect(compiled.query(By.css('#login-tab'))).toBeTruthy();
      expect(compiled.query(By.css('#signup-tab'))).toBeTruthy();
    });

    it('should activate Login tab by default', () => {
      expect(component.tabActive).toEqual('Login');
      expect(component.textButton()).toEqual('Enter');
    })

    it('should change tab on click', () => {
      const tabSignup = fixture.debugElement.query(By.css('#signup-tab'));
      tabSignup.nativeElement.click();
      fixture.detectChanges();
      expect(component.tabActive).toEqual('Signup');
      expect(component.textButton()).toEqual('Create');
    })
  })
});
