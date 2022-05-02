import { CalculateAgeInsuranceModifierUseCase } from '../../../../../../src/modules/risk-assessment/application/usecases/CalculateAgeInsuranceModifierUseCase'
import { InsuranceRiskModifierInterface } from '../../../../../../src/modules/risk-assessment/model/InsuranceRiskModifierInterface'
describe('RiskAssessment :: CalculateAgeInsuranceModifier', () => {
  let calculateAgeInsuranceModifierUseCase: CalculateAgeInsuranceModifierUseCase
  let ageInsuranceModifierConfigMock: InsuranceRiskModifierInterface[]
  beforeEach(async () => {
    ageInsuranceModifierConfigMock = [
      {
        MIN_VALUE: 0,
        MAX_VALUE: 29,
        MODIFIER: -2
      },
      {
        MIN_VALUE: 30,
        MAX_VALUE: 40,
        MODIFIER: -1
      }
    ]
    calculateAgeInsuranceModifierUseCase =
      new CalculateAgeInsuranceModifierUseCase(ageInsuranceModifierConfigMock)
  })

  it('Returns correct modifier from configs', () => {
    const ageMockFirstModifier = 15
    const ageMockSecondModifier = 40
    const ageMockDefaultModifier = 60

    expect(
      calculateAgeInsuranceModifierUseCase.execute(ageMockFirstModifier)
    ).toEqual(-2)
    expect(
      calculateAgeInsuranceModifierUseCase.execute(ageMockSecondModifier)
    ).toEqual(-1)
    expect(
      calculateAgeInsuranceModifierUseCase.execute(ageMockDefaultModifier)
    ).toEqual(0)
  })
})
