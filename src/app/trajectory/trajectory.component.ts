import {
  Component,
  Input,
  ElementRef,
  HostListener,
  OnInit,
  OnChanges
} from '@angular/core';
import {
  pairwise,
  filter,
  map,
  toArray,
  switchMap,
  take,
  scan,
  mergeMap,
  reduce,
  tap,
  bufferCount,
  takeUntil} from 'rxjs/operators';
import { HistoryRecord } from '../core/history-record';
import { of, Observable, from, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { PointData } from '../core/point-data';
import { PointCount } from '../core/point-count';
import { DataService } from '../core/data.service';
import { ElementPoint } from '../core/element-point';

@Component({
  selector: 'app-trajectory',
  templateUrl: './trajectory.component.html',
  styleUrls: ['./trajectory.component.scss']
})
export class TrajectoryComponent implements OnInit, OnChanges {
  pointCount: PointCount[];
  pointList: PointData[];
  element: HTMLElement;
  linePoints$: Observable<[ElementPoint, ElementPoint][]>;
  reloadElement$ = new Subject<boolean>();
  @Input() data: HistoryRecord[];

  getPointList() {
    return obs => obs.pipe(
      switchMap((p: HistoryRecord[]) => p),
      filter((p: HistoryRecord) => !!p.criticalLevel && !!p.oddsLevel),
      map((p: HistoryRecord) => ({
        id: `${p.oddsLevel}-${p.criticalLevel}`,
        date: p.modifyTime
      } as PointData)),
      toArray(),
      map((p: PointData[]) => p.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))),
      map((p: PointData[]) => p.map((data, idx) => ({ ...data, order: idx })))
    );
  }

  getPointCount() {
    return obs => obs.pipe(
      mergeMap((pointList: PointData[]) => from(pointList)
          .pipe(
            reduce((acc, value: PointData) => {
              const id = value.id;
              if (!acc[id]) {
                acc[id] = { total: 0, current: 0 } as PointCount;
              }
              acc[id].total++;
              return acc;
            }, [] as PointCount[]),
            map(counts => ({ pointList: pointList, pointCount: counts }))
          ))
    );
  }

  ngOnChanges() {
    of(this.data)
      .pipe(
        filter(p => !!p && p.length > 0),
        this.getPointList(),
        this.getPointCount()
      ).subscribe((p: { pointList, pointCount }) => {
        this.pointList = p.pointList;
        this.pointCount = p.pointCount;
        this.service.pointList$.next(this.pointList);
        this.service.pointCount$.next(this.pointCount);
      });
  }

  @HostListener('window:resize') onResize() {
    this.draw();
  }

  resetCountsCurrentValue() {
    this.pointCount.forEach(p => p.current = 0);
    this.service.pointCount$.next(this.pointCount);
  }

  draw() {
    this.resetCountsCurrentValue();
  }

  ngOnInit() {
    this.linePoints$ =
      this.service.pointList$
        .pipe(
          mergeMap(pointList =>
            this.service.elementPoint$
            .pipe(
                bufferCount(pointList.length),
                switchMap(p => p.sort((a, b) => a.order - b.order)),
                pairwise(),
                bufferCount(pointList.length - 1, 1),
            )));
  }

  constructor(elRef: ElementRef, private service: DataService) {
    this.element = elRef.nativeElement;
   }
}
