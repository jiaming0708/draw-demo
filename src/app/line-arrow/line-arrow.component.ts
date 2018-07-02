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

  getAngle(): number {
    return this.isLeft ? -18 : 18;
  }

  ngOnChanges() {
    this.isLeft = this.direct === 'left';
    this.top = 1;
    this.left = 1;
    this.transform = `rotate(${this.getAngle()}deg)`;
  }
  ngAfterViewInit() {
    const elf = this.elRef.nativeElement as HTMLElement;
    elf.classList.add('draw-arrow');
  }

  constructor(private elRef: ElementRef) { }
}
