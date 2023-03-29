import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralMainPageComponent } from './general-main-page.component';

describe('GeneralMainPageComponent', () => {
  let component: GeneralMainPageComponent;
  let fixture: ComponentFixture<GeneralMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralMainPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
