import { InsuranceScoreEnum } from '../../model'

export interface CalculateRiskAssessmentResponse {
  auto: InsuranceScoreEnum
  home: InsuranceScoreEnum
  disability: InsuranceScoreEnum
  life: InsuranceScoreEnum
}
