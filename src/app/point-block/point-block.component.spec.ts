import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointBlockComponent } from './point-block.component';

describe('PointBlockComponent', () => {
  let component: PointBlockComponent;
  let fixture: ComponentFixture<PointBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
