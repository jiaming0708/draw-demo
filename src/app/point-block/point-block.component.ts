import { Component, OnInit, Input } from '@angular/core';
import { PointData } from '../core/point-data';

@Component({
  selector: 'app-point-block',
  templateUrl: './point-block.component.html',
  styleUrls: ['./point-block.component.scss']
})
export class PointBlockComponent implements OnInit {
  @Input() point: PointData;
  constructor() { }

  ngOnInit() {
  }

}
