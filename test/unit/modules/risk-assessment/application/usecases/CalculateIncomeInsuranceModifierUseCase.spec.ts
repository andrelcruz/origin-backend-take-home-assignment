import { CalculateIncomeInsuranceModifierUseCase } from '../../../../../../src/modules/risk-assessment/application/usecases/CalculateIncomeInsuranceModifierUseCase'
import { InsuranceRiskModifierInterface } from '../../../../../../src/modules/risk-assessment/model/InsuranceRiskModifierInterface'
describe('RiskAssessment :: CalculateIncomeInsuranceModifier', () => {
  let calculateIncomeInsuranceModifierUseCase: CalculateIncomeInsuranceModifierUseCase
  let incomeInsuranceModifierConfigMock: InsuranceRiskModifierInterface[]
  beforeEach(async () => {
    incomeInsuranceModifierConfigMock = [
      {
        MIN_VALUE: 200000,
        MODIFIER: -1
      }
    ]
    calculateIncomeInsuranceModifierUseCase =
      new CalculateIncomeInsuranceModifierUseCase(
        incomeInsuranceModifierConfigMock
      )
  })

  it('Returns correct modifier from configs', () => {
    const incomeMockFirstModifier = 250000
    const incomeMockDefaultModifier = 150000

    expect(
      calculateIncomeInsuranceModifierUseCase.execute(incomeMockFirstModifier)
    ).toEqual(-1)
    expect(
      calculateIncomeInsuranceModifierUseCase.execute(incomeMockDefaultModifier)
    ).toEqual(0)
  })
})
