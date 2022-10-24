import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelEditerComponent } from './hotel-editer.component';

describe('HotelEditerComponent', () => {
  let component: HotelEditerComponent;
  let fixture: ComponentFixture<HotelEditerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelEditerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelEditerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
