import { InsuranceRiskModifierInterface } from '@risk-assessment/model/InsuranceRiskModifierInterface'

export class CalculateIncomeInsuranceModifierUseCase {
  private incomeInsuranceModifiers

  constructor(incomeInsuranceModifiers: InsuranceRiskModifierInterface[]) {
    this.incomeInsuranceModifiers = incomeInsuranceModifiers
  }
  public execute(income: number): number {
    const modifier = this.incomeInsuranceModifiers.find(
      (modifier) => income >= modifier.MIN_VALUE
    )

    if (!modifier) return 0
    return modifier.MODIFIER
  }
}
