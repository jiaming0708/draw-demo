import { Component, OnInit } from '@angular/core';
import { DataService } from './core/data.service';
import { MatrixView } from './core/matrix-data';
import { HistoryRecord } from './core/history-record';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  matrix: MatrixView;
  records: HistoryRecord[];
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

  constructor(private service: DataService) {}
}
