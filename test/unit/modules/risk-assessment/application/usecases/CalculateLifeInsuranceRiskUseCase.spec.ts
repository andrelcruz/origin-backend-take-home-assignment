import { CalculateLifeInsuranceRiskUseCase } from '../../../../../../src/modules/risk-assessment/application/usecases'
import { InsuranceScoreEnum } from '../../../../../../src/modules/risk-assessment/model'
import { MaritalStatusEnum } from '../../../../../../src/modules/risk-assessment/model/MaritalStatusEnum'

describe('RiskAssessment :: CalculateLifeInsuranceRiskUseCase', () => {
  let calculateLifeInsuranceRiskUseCase: CalculateLifeInsuranceRiskUseCase
  let baseInsuranceRisk: number
  const LIFE_MAX_AGE_ALLOWED = 60
  let ageMockValue: number
  let dependentsMockValue: number
  let maritalStatusMockValue: MaritalStatusEnum

  beforeEach(async () => {
    baseInsuranceRisk = 2
    ageMockValue = 40
    dependentsMockValue = 0
    maritalStatusMockValue = MaritalStatusEnum.SINGLE

    calculateLifeInsuranceRiskUseCase = new CalculateLifeInsuranceRiskUseCase(
      LIFE_MAX_AGE_ALLOWED
    )
  })

  it('Returns the baseInsuranceRisk with modifier when client is married', () => {
    maritalStatusMockValue = MaritalStatusEnum.MARRIED

    const response = calculateLifeInsuranceRiskUseCase.execute(
      baseInsuranceRisk,
      ageMockValue,
      dependentsMockValue,
      maritalStatusMockValue
    )

    expect(response).toEqual(InsuranceScoreEnum.RESPONSIBLE)
  })

  it('Returns the baseInsuranceRisk with modifier when client has dependents', () => {
    baseInsuranceRisk = 0
    dependentsMockValue = 2

    const response = calculateLifeInsuranceRiskUseCase.execute(
      baseInsuranceRisk,
      ageMockValue,
      dependentsMockValue,
      maritalStatusMockValue
    )

    expect(response).toEqual(InsuranceScoreEnum.REGULAR)
  })

  it('Returns INELIGIBLE status when client is over 60 years old', () => {
    ageMockValue = 70

    const response = calculateLifeInsuranceRiskUseCase.execute(
      baseInsuranceRisk,
      ageMockValue,
      dependentsMockValue,
      maritalStatusMockValue
    )

    expect(response).toEqual(InsuranceScoreEnum.INELIGIBLE)
  })
})
