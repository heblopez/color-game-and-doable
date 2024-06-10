import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorGameComponent } from './color-game.component';
import { By } from '@angular/platform-browser';

describe('ColorGameComponent', () => {
  let component: ColorGameComponent;
  let fixture: ComponentFixture<ColorGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.title')?.textContent).toContain('Color Game');
  });

  describe('targetColor', () => {
    it('should render RGB values of target color', () => {
      component.colors.set([[255, 0, 255], [255, 255, 255], [0, 255, 255]]);
      component.targetIndex.set(1);
      // Then component.targetColor should return [255, 255, 255]
      fixture.detectChanges();
      const compiled = fixture.debugElement.queryAll(By.css('.rgb'));
      const valuesArray = compiled.map(el => Number(el.children[0].nativeElement.textContent));
      expect(valuesArray).toEqual([255, 255, 255]);
    });
  })

  describe('Number of squares', () => {
    it('should render the number of squares specified', () => {
      component.numOfColors.set(6);
      fixture.detectChanges();
      expect(component.squares.length).toEqual(6);
    });
  });
});
