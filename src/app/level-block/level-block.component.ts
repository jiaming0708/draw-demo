import {
  Component,
  Input,
  HostBinding,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { ResultsEntity } from 'src/app/core/matrix-data';
import { PointData } from '../core/point-data';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-level-block',
  templateUrl: './level-block.component.html',
  styleUrls: ['./level-block.component.scss']
})
export class LevelBlockComponent implements AfterViewInit {
  @Input() matrix: ResultsEntity;
  @Input() pointList$: Observable<PointData[]>;

  @Input()
  @HostBinding('id')
  id: string;
  @HostBinding('style.display') display = 'block';
  elm: HTMLElement;

  pointList: PointData[];

  ngAfterViewInit() {
    this.pointList$
      .pipe(
        map(p => p.filter(data => data.id === this.id))
      ).subscribe(p => this.pointList = p);
  }

  constructor(elRef: ElementRef) {
    this.elm = elRef.nativeElement;
  }
}
