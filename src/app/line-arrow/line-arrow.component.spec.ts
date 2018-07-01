import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineArrowComponent } from './line-arrow.component';

describe('LineArrowComponent', () => {
  let component: LineArrowComponent;
  let fixture: ComponentFixture<LineArrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineArrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
