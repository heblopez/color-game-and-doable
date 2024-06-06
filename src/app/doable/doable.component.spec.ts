import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoableComponent } from './doable.component';

describe('DoableComponent', () => {
  let component: DoableComponent;
  let fixture: ComponentFixture<DoableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
