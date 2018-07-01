import { Component, OnInit, ElementRef, OnChanges, Input, HostBinding, SimpleChanges, AfterViewInit } from '@angular/core';
import { ElementPoint } from '../core/element-point';

@Component({
  selector: 'app-line-arrow',
  templateUrl: './line-arrow.component.html',
  styleUrls: ['./line-arrow.component.scss']
})
export class LineArrowComponent implements AfterViewInit, OnChanges {
  @Input() direct: 'left' | 'right';
  @Input() point: ElementPoint;
  @Input() angle: number;
  @HostBinding('class.left') isLeft: boolean;
  @HostBinding('style.top.px') top: number;
  @HostBinding('style.left.px') left: number;
  @HostBinding('style.transform') transform: string;

  getAngle() {
    return this.angle + (this.isLeft ? -145 : 145);
  }

  ngOnChanges() {
    this.isLeft = this.direct === 'left';
    this.top = -this.point.top;
    this.left = -this.point.left;
    this.transform = `rotate(${this.getAngle()}deg)`;
  }
  ngAfterViewInit() {
    const elf = this.elRef.nativeElement as HTMLElement;
    elf.classList.add('draw-arrow');
  }

  constructor(private elRef: ElementRef) { }
}
