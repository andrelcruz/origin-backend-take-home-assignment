import { CalculateDisabilityInsuranceRiskUseCase } from '../../../../../../src/modules/risk-assessment/application/usecases'
import { HomeInformationRequest } from '../../../../../../src/modules/risk-assessment/input/request/HomeInformationRequest'
import { InsuranceScoreEnum } from '../../../../../../src/modules/risk-assessment/model'
import { HouseOwnershipEnum } from '../../../../../../src/modules/risk-assessment/model/HouseOwnershipEnum'
import { MaritalStatusEnum } from '../../../../../../src/modules/risk-assessment/model/MaritalStatusEnum'

describe('RiskAssessment :: CalculateDisabilityInsuranceRiskUseCase', () => {
  let calculateDisabilityInsuranceRiskUseCase: CalculateDisabilityInsuranceRiskUseCase
  let baseInsuranceRisk: number
  const DISABILITY_MAX_AGE_ALLOWED = 60
  let ageMockValue: number
  let houseInformationMockValue: HomeInformationRequest | null
  let dependentsMockValue: number
  let maritalStatusMockValue: MaritalStatusEnum
  let incomeMockValue: number

  beforeEach(async () => {
    baseInsuranceRisk = 2
    ageMockValue = 40
    houseInformationMockValue = null
    dependentsMockValue = 0
    maritalStatusMockValue = MaritalStatusEnum.SINGLE
    incomeMockValue = 100000

    calculateDisabilityInsuranceRiskUseCase =
      new CalculateDisabilityInsuranceRiskUseCase(DISABILITY_MAX_AGE_ALLOWED)
  })

  it('Returns the baseInsuranceRisk with modifier when house is mortgaged', () => {
    const houseInformationMockValue: HomeInformationRequest = {
      ownership_status: HouseOwnershipEnum.MORTGAGED
    }

    const response = calculateDisabilityInsuranceRiskUseCase.execute(
      baseInsuranceRisk,
      ageMockValue,
      incomeMockValue,
      dependentsMockValue,
      maritalStatusMockValue,
      houseInformationMockValue
    )

    expect(response).toEqual(InsuranceScoreEnum.RESPONSIBLE)
  })

  it('Returns the baseInsuranceRisk with modifier when client is married', () => {
    baseInsuranceRisk = 1
    maritalStatusMockValue = MaritalStatusEnum.MARRIED

    const response = calculateDisabilityInsuranceRiskUseCase.execute(
      baseInsuranceRisk,
      ageMockValue,
      incomeMockValue,
      dependentsMockValue,
      maritalStatusMockValue,
      houseInformationMockValue
    )

    expect(response).toEqual(InsuranceScoreEnum.ECONOMIC)
  })

  it('Returns the baseInsuranceRisk with modifier when client has dependents', () => {
    baseInsuranceRisk = 0
    dependentsMockValue = 2

    const response = calculateDisabilityInsuranceRiskUseCase.execute(
      baseInsuranceRisk,
      ageMockValue,
      incomeMockValue,
      dependentsMockValue,
      maritalStatusMockValue,
      houseInformationMockValue
    )

    expect(response).toEqual(InsuranceScoreEnum.REGULAR)
  })

  it('Returns INELIGIBLE status when client is over 60 years old', () => {
    ageMockValue = 70

    const response = calculateDisabilityInsuranceRiskUseCase.execute(
      baseInsuranceRisk,
      ageMockValue,
      incomeMockValue,
      dependentsMockValue,
      maritalStatusMockValue,
      houseInformationMockValue
    )

    expect(response).toEqual(InsuranceScoreEnum.INELIGIBLE)
  })

  it('Returns INELIGIBLE status when client has no income', () => {
    incomeMockValue = 0

    const response = calculateDisabilityInsuranceRiskUseCase.execute(
      baseInsuranceRisk,
      ageMockValue,
      incomeMockValue,
      dependentsMockValue,
      maritalStatusMockValue,
      houseInformationMockValue
    )

    expect(response).toEqual(InsuranceScoreEnum.INELIGIBLE)
  })
})
