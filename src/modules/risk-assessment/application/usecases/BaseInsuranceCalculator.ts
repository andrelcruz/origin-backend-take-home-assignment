import { InsuranceScoreEnum } from '@risk-assessment/model'

export class BaseInsuranceCalculator {
  protected assessRisk(riskValue: number): InsuranceScoreEnum {
    if (riskValue <= 0) return InsuranceScoreEnum.ECONOMIC
    if (riskValue <= 2) return InsuranceScoreEnum.REGULAR
    return InsuranceScoreEnum.RESPONSIBLE
  }
}
