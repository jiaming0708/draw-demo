import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  RiskMatrixView,
  CriticalsEntityOrOddsEntity,
  RiskLevelEntity,
  ResultsEntity
} from './risk-matrix';
import { RiskHistoryRecord } from './risk-history-record';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  martixData: RiskMatrixView = {
    criticals: [
      {
        id: '40faeeb5-8cfa-e711-820f-a0afbdeee95d',
        levelType: 1,
        riskLevel: 1,
        matrixLevel: 1,
        code: 'S1'
      },
      {
        id: 'fcb8debe-8cfa-e711-820f-a0afbdeee95d',
        levelType: 1,
        riskLevel: 1,
        matrixLevel: 2,
        code: 'S2'
      },
      {
        id: '2b8607c5-8cfa-e711-820f-a0afbdeee95d',
        levelType: 1,
        riskLevel: 1,
        matrixLevel: 3,
        code: 'S3'
      },
      {
        id: '3a365cd1-8cfa-e711-820f-a0afbdeee95d',
        levelType: 1,
        riskLevel: 1,
        matrixLevel: 4,
        code: 'S4'
      }
    ] as CriticalsEntityOrOddsEntity[],
    odds: [
      {
        id: '0edb2df1-8cfa-e711-820f-a0afbdeee95d',
        levelType: 2,
        riskLevel: 1,
        matrixLevel: 1,
        code: 'P1'
      },
      {
        id: '49f828f7-8cfa-e711-820f-a0afbdeee95d',
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
    ] as CriticalsEntityOrOddsEntity[],
    riskLevel: [
      {
        id: 'c8654f13-8dfa-e711-820f-a0afbdeee95d',
        levelType: 3,
        matrixLevel: 1,
        code: '1',
        colorCode: '#C2DE9D'
      },
      {
        id: 'c9654f13-8dfa-e711-820f-a0afbdeee95d',
        levelType: 3,
        matrixLevel: 2,
        code: '2',
        colorCode: '#82B6BF'
      },
      {
        id: '151f2c24-8dfa-e711-820f-a0afbdeee95d',
        levelType: 3,
        matrixLevel: 3,
        code: '3',
        colorCode: '#F0DAB6'
      },
      {
        id: '161f2c24-8dfa-e711-820f-a0afbdeee95d',
        levelType: 3,
        riskLevel: 3,
        matrixLevel: 4,
        code: '4',
        colorCode: '#D697A7'
      },
      {
        id: '171f2c24-8dfa-e711-820f-a0afbdeee95d',
        levelType: 3,
        riskLevel: 3,
        matrixLevel: 5,
        code: '5',
        colorCode: '#E1443A'
      }
    ] as RiskLevelEntity[],
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
  } as RiskMatrixView;

  historyData = [
    {
      id: '9b8cd93f-a31b-e811-80c2-00155db05917',
      dbVersion: null,
      modifyTime: '2018/03/27',
      modifyUserId: 'c1a42558-ebf5-e711-80c3-000d3a80a3d3',
      criticalLevel: 4,
      oddsLevel: 4
    },
    {
      id: 'd040275c-bb17-e811-80c2-000d3a8024db',
      dbVersion: null,
      modifyTime: '2018/02/27',
      modifyUserId: 'c1a42558-ebf5-e711-80c3-000d3a80a3d3',
      criticalLevel: 3,
      oddsLevel: 3
    }
  ] as RiskHistoryRecord[];

  getMatrix(): Observable<RiskMatrixView> {
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

  getHistory(): Observable<RiskHistoryRecord[]> {
    return of(this.historyData);
  }
  constructor() {}
}
