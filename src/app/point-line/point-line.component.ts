import { Component, OnInit, Input, ElementRef, AfterViewInit, HostBinding } from '@angular/core';
import { ElementPoint } from '../core/element-point';
import { hostElement } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-point-line',
  templateUrl: './point-line.component.html',
  styleUrls: ['./point-line.component.scss']
})
export class PointLineComponent implements AfterViewInit {
  elm: HTMLElement;
  startPoint: ElementPoint;
  endPoint: ElementPoint;
  angle: number;
  @HostBinding('style.top.px') top: number;
  @HostBinding('style.left.px') left: number;
  @HostBinding('style.transform') transform: string;
  @HostBinding('style.width.px') width: number;
  @Input() set points(val: [ElementPoint, ElementPoint]) {
    this.startPoint = val[0];
    this.endPoint = val[1];
    this.drawLine(this.startPoint, this.endPoint);
  }

  drawLine(start: ElementPoint, end: ElementPoint) {
    this.angle = Math.atan2(start.top - end.top, start.left - end.left) * 180 / Math.PI + 180;
    const width = this.lineDistance(start.left, start.top, end.left, end.top);

    this.top = start.top;
    this.left = start.left;
    this.transform = `rotate(${this.angle}deg)`;
    this.width = width;
  }

  lineDistance(x, y, x0, y0) {
    const w = x - x0;
    const h = y - y0;
    return Math.sqrt(w * w + h * h);
  }

  ngAfterViewInit() {
    this.elm = this.elRef.nativeElement;
    this.elm.classList.add('draw-line');
  }

  constructor(private elRef: ElementRef) { }

}
