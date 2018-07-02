import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  MatrixView,
  LevelEntityIncludeRisk,
  LevelEntity,
  ResultsEntity
} from './matrix-data';
import { HistoryRecord } from './history-record';
import { PointData } from './point-data';
import { PointCount } from './point-count';
import { ElementPoint } from './element-point';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  martixData: MatrixView = {
    criticals: [
      {
        levelType: 1,
        riskLevel: 1,
        matrixLevel: 1,
        code: 'S1'
      },
      {
        levelType: 1,
        riskLevel: 1,
        matrixLevel: 2,
        code: 'S2'
      },
      {
        levelType: 1,
        riskLevel: 1,
        matrixLevel: 3,
        code: 'S3'
      },
      {
        levelType: 1,
        riskLevel: 1,
        matrixLevel: 4,
        code: 'S4'
      }
    ] as LevelEntityIncludeRisk[],
    odds: [
      {
        levelType: 2,
        riskLevel: 1,
        matrixLevel: 1,
        code: 'P1'
      },
      {
        levelType: 2,
        riskLevel: 1,
        matrixLevel: 2,
        code: 'P2'
      },
      {
        id: '291308ff-8cfa-e711-820f-a0afbdeee95d',
        levelType: 2,
        riskLevel: 1,
        matrixLevel: 3,
        code: 'P3'
      },
      {
        id: 'd9d61606-8dfa-e711-820f-a0afbdeee95d',
        levelType: 2,
        riskLevel: 1,
        matrixLevel: 4,
        code: 'P4'
      }
    ] as LevelEntityIncludeRisk[],
    riskLevel: [
      {
        levelType: 3,
        matrixLevel: 1,
        code: '1',
        colorCode: '#C2DE9D'
      },
      {
        levelType: 3,
        matrixLevel: 2,
        code: '2',
        colorCode: '#82B6BF'
      },
      {
        levelType: 3,
        matrixLevel: 3,
        code: '3',
        colorCode: '#F0DAB6'
      },
      {
        levelType: 3,
        riskLevel: 3,
        matrixLevel: 4,
        code: '4',
        colorCode: '#D697A7'
      },
      {
        levelType: 3,
        riskLevel: 3,
        matrixLevel: 5,
        code: '5',
        colorCode: '#E1443A'
      }
    ] as LevelEntity[],
    results: [
      { levelCompose: '1-1', matrixLevel: 1, colorCode: '#C2DE9D' },
      { levelCompose: '1-2', matrixLevel: 2, colorCode: '#82B6BF' },
      { levelCompose: '1-3', matrixLevel: 3, colorCode: '#F0DAB6' },
      { levelCompose: '1-4', matrixLevel: 3, colorCode: '#F0DAB6' },
      { levelCompose: '2-1', matrixLevel: 2, colorCode: '#82B6BF' },
      { levelCompose: '2-2', matrixLevel: 3, colorCode: '#F0DAB6' },
      { levelCompose: '2-3', matrixLevel: 3, colorCode: '#F0DAB6' },
      { levelCompose: '2-4', matrixLevel: 4, colorCode: '#D697A7' },
      { levelCompose: '3-1', matrixLevel: 3, colorCode: '#F0DAB6' },
      { levelCompose: '3-2', matrixLevel: 3, colorCode: '#F0DAB6' },
      { levelCompose: '3-3', matrixLevel: 4, colorCode: '#D697A7' },
      { levelCompose: '3-4', matrixLevel: 4, colorCode: '#D697A7' },
      { levelCompose: '4-1', matrixLevel: 3, colorCode: '#F0DAB6' },
      { levelCompose: '4-2', matrixLevel: 4, colorCode: '#D697A7' },
      { levelCompose: '4-3', matrixLevel: 4, colorCode: '#D697A7' },
      { levelCompose: '4-4', matrixLevel: 5, colorCode: '#E1443A' }
    ] as ResultsEntity[]
  } as MatrixView;

  historyData = [
    {
      dbVersion: null,
      modifyTime: '2018/03/27',
      modifyUserId: 'c1a42558-ebf5-e711-80c3-000d3a80a3d3',
      criticalLevel: 4,
      oddsLevel: 4
    },
    {
      dbVersion: null,
      modifyTime: '2018/02/27',
      modifyUserId: 'c1a42558-ebf5-e711-80c3-000d3a80a3d3',
      criticalLevel: 3,
      oddsLevel: 3
    },
    {
      dbVersion: null,
      modifyTime: '2018/01/27',
      modifyUserId: 'c1a42558-ebf5-e711-80c3-000d3a80a3d3',
      criticalLevel: 2,
      oddsLevel: 2
    },
    {
      dbVersion: null,
      modifyTime: '2018/04/27',
      modifyUserId: 'c1a42558-ebf5-e711-80c3-000d3a80a3d3',
      criticalLevel: 3,
      oddsLevel: 3
    },
    {
      dbVersion: null,
      modifyTime: '2018/03/22',
      modifyUserId: 'c1a42558-ebf5-e711-80c3-000d3a80a3d3',
      criticalLevel: 4,
      oddsLevel: 2
    }
  ] as HistoryRecord[];

  pointList = new Subject<PointData[]>();
  pointCount = new BehaviorSubject<PointCount[]>([]);
  elementPoint$ = new Subject<ElementPoint>();

  getMatrix(): Observable<MatrixView> {
    return of(this.martixData).pipe(
      map(matrix => {
        matrix.criticals = matrix.criticals.sort(
          (a, b) => b.matrixLevel - a.matrixLevel
        );
        matrix.odds = matrix.odds.sort((a, b) => b.matrixLevel - a.matrixLevel);
        // 轉換為二維陣列
        const rows = matrix.odds.length;
        const cols = matrix.criticals.length;
        matrix.matrix = [];

        matrix.results.forEach(item => {
          const [row, col] = item.levelCompose.split('-');
          if (!matrix.matrix[rows - +row]) {
            matrix.matrix[rows - +row] = [];
          }
          matrix.matrix[rows - +row][cols - +col] = item;
        });
        return matrix;
      })
    );
  }

  getHistory(): Observable<HistoryRecord[]> {
    return of(this.historyData);
  }
  constructor() {}
}
