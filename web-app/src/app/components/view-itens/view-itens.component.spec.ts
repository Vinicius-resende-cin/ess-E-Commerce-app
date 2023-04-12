import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItensComponent } from './view-itens.component';

describe('ViewItensComponent', () => {
  let component: ViewItensComponent;
  let fixture: ComponentFixture<ViewItensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewItensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
