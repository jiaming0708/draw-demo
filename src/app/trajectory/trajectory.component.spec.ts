import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrajectoryComponent } from './trajectory.component';
import { HistoryRecord } from '../core/history-record';
import { PointData } from '../core/point-data';
import { PointCount } from '../core/point-count';

describe('TrajectoryComponent', () => {
  let component: TrajectoryComponent;
  let fixture: ComponentFixture<TrajectoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrajectoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrajectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get pointList and pointCount after set hisotries', () => {

    const historyData = [
      {
        dbVersion: null,
        modifyTime: '2018/03/27',
        modifyUserId: 'c1a42558-ebf5-e711-80c3-000d3a80a3d3',
        criticalLevel: 4,
        oddsLevel: 4
      },
      {
        dbVersion: null,
        modifyTime: '2018/02/27',
        modifyUserId: 'c1a42558-ebf5-e711-80c3-000d3a80a3d3',
        criticalLevel: 3,
        oddsLevel: 3
      }
    ] as HistoryRecord[];
    component.data = historyData;
    const expectedList = [
      { id: '3-3', date: '2018/02/27' },
      { id: '4-4', date: '2018/03/27' }
    ] as PointData[];
    expect(component.pointList).toEqual(expectedList);
    const expectedCount = [] as PointCount[];
    expectedCount['3-3'] = { total: 1, current: 0 };
    expectedCount['4-4'] = { total: 1, current: 0 };
    expect(component.pointCount).toEqual(expectedCount);
  });
});
