export interface RiskMatrixView {
  criticals?: CriticalsEntityOrOddsEntity[];
  odds?: CriticalsEntityOrOddsEntity[];
  riskLevel?: RiskLevelEntity[];
  results?: ResultsEntity[];
  matrix?: ResultsEntity[][];
  matrixId?: string;
}
export interface CriticalsEntityOrOddsEntity {
  levelType?: number;
  riskLevel: number;
  matrixLevel: number;
  code: string;
  displayName?: string;
  defien?: string;
  description?: string;
  colorCode?: null;
  id?: string;
}
export interface RiskLevelEntity {
  levelType?: number;
  matrixLevel: number;
  code: string;
  displayName?: string;
  defien?: string;
  description?: string;
  colorCode?: string;
  id?: string;
}
export interface ResultsEntity {
  levelCompose: string;
  matrixLevel: number;
  colorCode: string;
  historiesOrder: number;
}
