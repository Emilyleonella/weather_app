import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForecastViewComponent } from './forecast-view.component';

describe('ForecastViewComponent', () => {
  let component: ForecastViewComponent;
  let fixture: ComponentFixture<ForecastViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastViewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ForecastViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 