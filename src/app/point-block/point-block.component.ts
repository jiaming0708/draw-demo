import {
  Component,
  Input,
  HostBinding,
  ElementRef,
  OnInit} from '@angular/core';
import { PointData } from '../core/point-data';
import { DataService } from '../core/data.service';
import { map } from 'rxjs/operators';
import { PointCount } from '../core/point-count';
import { Point } from '../core/point';

@Component({
  selector: 'app-point-block',
  templateUrl: './point-block.component.html',
  styleUrls: ['./point-block.component.scss']
})
export class PointBlockComponent implements OnInit {
  elm: HTMLElement;
  @HostBinding('class.sm') isSmall: boolean;
  @HostBinding('style.top.px') top: number;
  @HostBinding('style.left.px') left: number;
  @Input() point: PointData;
  @Input() matrixLevel: string;
  @Input() parentElm: HTMLElement;

  ngOnInit() {
    this.elm.classList.add('draw-point');

    this.service.pointCount$
      .pipe(
        map(p => p[this.point.id])
      )
      .subscribe(count => this.calculatePoint(count));
  }

  calculatePoint(count: PointCount) {
    const centerX = this.parentElm.clientWidth / 2;
    const centerY = this.parentElm.clientHeight / 2;
    const point = {
      top: this.parentElm.offsetTop + centerY,
      left: this.parentElm.offsetLeft + centerX
    } as Point;

    if (count.total > 1) {
      this.calculatePointWithAngle(count, point);
    } else {
      this.calculatePointWithoutAngle(point);
    }

    this.isSmall = count.total > 1;
    this.top = point.top;
    this.left = point.left;
    this.matrixLevel = this.isSmall ? '' : this.matrixLevel;

    setTimeout(() => {
      // cuz change detection
      this.sendElementPoint();
    }, 10);
  }

  calculatePointWithAngle(count: PointCount, point: Point) {
    const angle = 360 / count.total * ++count.current;
    const r = 30;
    const d = angle * Math.PI / 180;
    point.top = point.top + r * Math.sin(d) - this.elm.offsetHeight / 2;
    point.left = point.left + r * Math.cos(d) - this.elm.offsetWidth / 2;
  }

  calculatePointWithoutAngle(point: Point) {
    point.top -= this.elm.clientHeight / 2;
    point.left -= this.elm.clientWidth / 2;
  }

  sendElementPoint() {
    const rect = this.elm.getBoundingClientRect();
    this.service.elementPoint$.next({
      top: rect.top + this.elm.offsetHeight / 2,
      left: rect.left + this.elm.offsetWidth / 2,
      order: this.point.order
    });
  }

  constructor(private service: DataService,
    elmRef: ElementRef) {
    this.elm = elmRef.nativeElement;
  }
}
