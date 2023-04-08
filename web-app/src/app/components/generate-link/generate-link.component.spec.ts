import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateLinkComponent } from './generate-link.component';

describe('GenerateLinkComponent', () => {
  let component: GenerateLinkComponent;
  let fixture: ComponentFixture<GenerateLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
