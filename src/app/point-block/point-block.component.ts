import {
  Component,
  Input,
  Host,
  AfterViewInit,
  HostBinding,
  ElementRef
} from '@angular/core';
import { PointData } from '../core/point-data';
import { LevelBlockComponent } from '../level-block/level-block.component';
import { DataService } from '../core/data.service';
import { map } from 'rxjs/operators';
import { PointCount } from '../core/point-count';
import { Point } from '../core/point';

@Component({
  selector: 'app-point-block',
  templateUrl: './point-block.component.html',
  styleUrls: ['./point-block.component.scss']
})
export class PointBlockComponent implements AfterViewInit {
  elm: HTMLElement;
  text: number;
  @HostBinding('class.sm') isSmall: boolean;
  @HostBinding('style.top.px') top: number;
  @HostBinding('style.left.px') left: number;
  @Input() point: PointData;

  ngAfterViewInit() {
    this.elm = this.elmRef.nativeElement;
    this.elm.classList.add('draw-point');

    this.service.pointCount
      .pipe(
        map(p => p[this.point.id])
      )
      .subscribe(count => this.calculatePoint(count));
  }

  calculatePoint(count: PointCount) {
    const parentElm = this.parent.elm;
    const centerX = parentElm.clientWidth / 2;
    const centerY = parentElm.clientHeight / 2;
    const point = {
      top: parentElm.offsetTop + centerY,
      left: parentElm.offsetLeft + centerX
    } as Point;

    if (count.total > 1) {
      this.getPointWithAngle(count, point);
    } else {
      this.getPointWithoutAngle(point);
    }

    setTimeout(() => {
      this.isSmall = count.total > 1;
      this.top = point.top;
      this.left = point.left;
    });

    setTimeout(() => {
      // cuz change detection
      const rect = this.elm.getBoundingClientRect();
        this.service.elementPoint$.next({
          top: rect.top + this.elm.offsetHeight / 2,
          left: rect.left + this.elm.offsetWidth / 2,
          order: this.point.order
        });
    }, 10);
  }

  getPointWithAngle(count: PointCount, point: Point) {
    const angle = 360 / count.total * ++count.current;
    const r = 30;
    const d = angle * Math.PI / 180;
    point.top = point.top + r * Math.sin(d) - this.elm.offsetHeight / 2;
    point.left = point.left + r * Math.cos(d) - this.elm.offsetWidth / 2;
  }

  getPointWithoutAngle(point: Point) {
    point.top -= this.elm.clientHeight / 2;
    point.left -= this.elm.clientWidth / 2;
    setTimeout(() => {
      // 因為點放在中心，文字會被蓋掉，所以要加上
      this.text = this.parent.matrix.matrixLevel;
    });
  }

  constructor(@Host() private parent: LevelBlockComponent,
    private service: DataService,
    private elmRef: ElementRef) { }
}
