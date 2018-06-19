import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelBlockComponent } from './level-block.component';

describe('LevelBlockComponent', () => {
  let component: LevelBlockComponent;
  let fixture: ComponentFixture<LevelBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
