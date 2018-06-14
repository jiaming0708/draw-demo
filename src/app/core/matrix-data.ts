export interface MatrixView {
  criticals?: LevelEntityIncludeRisk[];
  odds?: LevelEntityIncludeRisk[];
  riskLevel?: LevelEntity[];
  results?: ResultsEntity[];
  matrix?: ResultsEntity[][];
  matrixId?: string;
}
export interface LevelEntityIncludeRisk extends LevelEntity {
  riskLevel: number;
}
export interface LevelEntity {
  levelType?: number;
  matrixLevel: number;
  code: string;
  displayName?: string;
  defien?: string;
  description?: string;
  colorCode?: string;
}
export interface ResultsEntity {
  levelCompose: string;
  matrixLevel: number;
  colorCode: string;
  historiesOrder: number;
}
