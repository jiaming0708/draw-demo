import { Component, OnInit } from '@angular/core';
import { DataService } from './core/data.service';
import { RiskMatrixView } from './core/risk-matrix';
import { mergeMap, map, delay } from 'rxjs/operators';
import { RiskHistoryRecord } from './core/risk-history-record';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  matrix: RiskMatrixView;
  records: RiskHistoryRecord[];
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
