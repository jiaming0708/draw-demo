import {
  Component,
  Input,
  ElementRef,
  Renderer2,
  HostListener,
  QueryList,
  ContentChildren,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import { pairwise, filter, map, toArray, switchMap, takeUntil, take, mergeMap, tap, last, scan, concatMap, concat } from 'rxjs/operators';
import { HistoryRecord } from '../core/history-record';
import { from, of, merge } from 'rxjs';
import * as $ from 'jquery';
import { PointData } from '../core/point-data';
import { PointCount } from '../core/point-count';
import { LevelBlockDirective } from '../level-block.directive';
import { DataService } from '../core/data.service';
import { ElementPoint } from '../core/element-point';

@Component({
  selector: 'app-trajectory',
  templateUrl: './trajectory.component.html',
  styleUrls: ['./trajectory.component.scss']
})
export class TrajectoryComponent implements AfterViewInit {
  pointCount: PointCount[];
  pointList: PointData[];
  element: HTMLElement;
  @Output() pointListChange = new EventEmitter();
  @ContentChildren(LevelBlockDirective, {descendants: true}) levelBlocks: QueryList<LevelBlockDirective>;

  @Input() set data(val: HistoryRecord[]) {
    if (!!val) {
      of(val)
        .pipe(
          this.getPointList(),
          map((points: PointData[]) => {
            const pointList = points;
            const pointCount = this.getPointCount(pointList);
            return { pointList: pointList, pointCount: pointCount };
          })
        ).subscribe(p => {
          this.pointList = p.pointList;
          this.pointCount = p.pointCount;
          this.service.pointList.next(this.pointList);
          this.service.pointCount.next(this.pointCount);
        });
    }
  }

  getPointList() {
    return obs => obs.pipe(
      switchMap((p: HistoryRecord[]) => p),
      filter((p: HistoryRecord) => !!p.criticalLevel && !!p.oddsLevel),
      map((p: HistoryRecord) => ({
        id: `${p.oddsLevel}-${p.criticalLevel}`,
        date: p.modifyTime
      } as PointData)),
      toArray(),
      map((p: PointData[]) => p.reverse()),
      map((p: PointData[]) => {
        p.forEach((data, idx) => data.order = idx);
        return p;
      })
    );
  }

  getPointCount(pointList: PointData[]) {
    // 1.計算每個位置的數量
    return pointList.reduce((arr, item) => {
      const id = item.id;
      if (!arr[id]) {
        arr[id] = { total: 0, current: 0 } as PointCount;
      }
      arr[id].total++;
      return arr;
    }, [] as PointCount[]);
  }

  @HostListener('window:resize') onResize() {
    // this.draw();
  }

  resetCountsCurrentValue() {
    this.pointCount.forEach(p => p.current = 0);
  }

  draw() {
    // $(this.element).empty();
    this.resetCountsCurrentValue();

    // 2. 先算出全部點位的位置
    const result = this.pointList.map(pointObj => {
      const id = pointObj.id;
      const dom = $(`#${id}`);
      const domPoint = dom.offset();
      const pointCenterX = dom.width() / 2;
      const pointCenterY = dom.height() / 2;
      const countData = this.pointCount[id];

      const point = document.createElement('div');
      const date = pointObj.date;
      $(point).addClass('draw-point');
      this.renderer.appendChild(this.element, point);
      let top = domPoint.top + pointCenterY;
      let left = domPoint.left + pointCenterX;

      if (countData.total > 1) {
        $(point).addClass('sm');
        // 以B點為中心，有斜率、角度要取得點
        const angle = 360 / countData.total * ++countData.current;
        const r = 30;
        const d = angle * Math.PI / 180;
        top = top + r * Math.sin(d) - $(point).height() / 2;
        left = left + r * Math.cos(d) - $(point).width() / 2;
      } else {
        top -= $(point).height() / 2;
        left -= $(point).width() / 2;
        // 因為點放在中心，文字會被蓋掉，所以要加上
        $(point).text(dom.text());
      }

      $(point).css({ top: top, left: left });
      $(point).append(`<span class="content">${date}</span>`);

      return {
        position: pointObj.id,
        top: top + $(point).height() / 2,
        left: left + $(point).width() / 2
      };
    });

    // 2. 開始畫線，把箭頭畫在線上
    from(result)
      .pipe(
        pairwise(),
    ).subscribe(data => {
      const angle = Math.atan2(data['0'].top - data['1'].top, data['0'].left - data['1'].left) * 180 / Math.PI + 180;
      const width = this.lineDistance(data['0'].left, data['0'].top, data['1'].left, data['1'].top);

      const lineAngle = angle; // - 1;
      const line = document.createElement('div');
      $(line).addClass('draw-line');
      $(line).css({ top: data['0'].top, left: data['0'].left, transform: `rotate(${lineAngle}deg)` });
      $(line).width(width);
      this.renderer.appendChild(this.element, line);

      // arrow
      // const arrowPosition = this.calArrowPosition(angle, data['1']);
      // const arrowRight = document.createElement('div');
      // $(arrowRight).addClass('draw-arrow');
      // $(arrowRight).css({ top: arrowPosition.top, left: arrowPosition.left, transform: `rotate(${angle + 145}deg)` });
      // this.renderer.appendChild(this.element, arrowRight);

      // const arrowLeft = document.createElement('div');
      // $(arrowLeft).addClass('draw-arrow left');
      // $(arrowLeft).css({ top: arrowPosition.top, left: arrowPosition.left, transform: `rotate(${angle - 145}deg)` });
      // this.renderer.appendChild(this.element, arrowLeft);
    });
  }
  lineDistance(x, y, x0, y0) {
    const w = x - x0;
    const h = y - y0;
    return Math.sqrt(w * w + h * h);
  }
  calArrowPosition(point: any) {
    // angle -= 180;

    // const r = 10;
    // const d = angle * Math.PI / 180;
    // const top = point.top + r * Math.sin(d);
    // const left = point.left + r * Math.cos(d);

    return { top: point.top, left: point.left };
  }

  ngAfterViewInit() {
    this.service.elementPoint$
      .pipe(
        scan((acc: ElementPoint[], val: ElementPoint) => [...acc, val], []),
        filter(p => p.length === this.pointList.length),
        switchMap(p => p.sort((a, b) => a.order - b.order)),
        pairwise()
      )
      .subscribe(p => console.log(p));
  }

  constructor(elRef: ElementRef, private renderer: Renderer2, private service: DataService) {
    this.element = elRef.nativeElement;
   }
}
