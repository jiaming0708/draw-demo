import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointLineComponent } from './point-line.component';

describe('PointLineComponent', () => {
  let component: PointLineComponent;
  let fixture: ComponentFixture<PointLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
