import { InsuranceScoreEnum } from '@risk-assessment/model'

export interface CalculateRiskAssessmentResponse {
  auto: InsuranceScoreEnum
  home: InsuranceScoreEnum
  disability: InsuranceScoreEnum
  life: InsuranceScoreEnum
}
