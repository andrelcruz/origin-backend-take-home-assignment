import { InsuranceRiskModifierInterface } from '@risk-assessment/model/InsuranceRiskModifierInterface'

export class CalculateAgeInsuranceModifierUseCase {
  private ageInsuranceModifiers

  constructor(ageInsuranceModifiers: InsuranceRiskModifierInterface[]) {
    this.ageInsuranceModifiers = ageInsuranceModifiers
  }
  public execute(age: number): number {
    const modifier = this.ageInsuranceModifiers.find(
      (modifier) => age >= modifier.MIN_VALUE && age <= modifier.MAX_VALUE
    )

    if (!modifier) return 0
    return modifier.MODIFIER
  }
}
