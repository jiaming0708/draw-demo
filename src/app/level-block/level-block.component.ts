import { Component, OnInit, Input, HostBinding, AfterViewChecked, AfterViewInit, ElementRef } from '@angular/core';
import { ResultsEntity } from 'src/app/core/matrix-data';
import { PointData } from '../core/point-data';
import { DataService } from '../core/data.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-level-block',
  templateUrl: './level-block.component.html',
  styleUrls: ['./level-block.component.scss']
})
export class LevelBlockComponent implements AfterViewInit {
  @Input() matrix: ResultsEntity;

  @Input()
  @HostBinding('id')
  id: string;
  @HostBinding('style.display') display = 'block';
  elm: HTMLElement;

  pointList: PointData[];

  constructor(private service: DataService, private elRef: ElementRef) { }

  ngAfterViewInit() {
    this.elm = this.elRef.nativeElement;

    this.service.pointList
      .pipe(
        map(p => p.filter(data => data.id === this.id))
      ).subscribe(p => this.pointList = p);
  }

}
