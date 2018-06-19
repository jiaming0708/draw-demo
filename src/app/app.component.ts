import { Component, OnInit } from '@angular/core';
import { DataService } from './core/data.service';
import { MatrixView } from './core/matrix-data';
import { HistoryRecord } from './core/history-record';
import { PointData } from './core/point-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  matrix: MatrixView;
  records: HistoryRecord[];
  pointList: PointData[];
  ngOnInit(): void {
    this.service
      .getMatrix()
      .subscribe(matrix => {
        this.matrix = matrix;

        this.service.getHistory()
          .subscribe(records => {
            setTimeout(() => {
              this.records = records;
            });
          });
      });
  }

  pointListChange($event: PointData[]) {
    this.pointList = $event;
  }

  constructor(private service: DataService) {}
}
