import { InsuranceScoreEnum } from '../../model/InsuranceScoreEnum'
import { MaritalStatusEnum } from '../../model/MaritalStatusEnum'
import { BaseInsuranceCalculator } from './BaseInsuranceCalculator'
export class CalculateLifeInsuranceRiskUseCase extends BaseInsuranceCalculator {
  private LifeMaxAgeAllowed: number
  constructor(LifeMaxAgeAllowed: number) {
    super()
    this.LifeMaxAgeAllowed = LifeMaxAgeAllowed
  }

  public execute(
    baseInsuranceRisk: number,
    age: number,
    dependents: number,
    maritalStatus: MaritalStatusEnum
  ): InsuranceScoreEnum {
    const isEligible = this.isEligibleForInsurance(age)
    if (!isEligible) return InsuranceScoreEnum.INELIGIBLE

    const dependentsModifierValue = this.dependentsModifier(dependents)
    const maritalStatusModifierValue = this.maritalStatusModifier(maritalStatus)

    const homeInsuranceRiskValue =
      baseInsuranceRisk + dependentsModifierValue + maritalStatusModifierValue

    return this.assessRisk(homeInsuranceRiskValue)
  }

  private isEligibleForInsurance(age: number): boolean {
    return age <= this.LifeMaxAgeAllowed
  }

  private dependentsModifier(dependents: number): number {
    if (dependents > 0) return 1
    return 0
  }

  private maritalStatusModifier(maritalStatus: MaritalStatusEnum): number {
    if (maritalStatus === MaritalStatusEnum.MARRIED) return 1
    return 0
  }
}
