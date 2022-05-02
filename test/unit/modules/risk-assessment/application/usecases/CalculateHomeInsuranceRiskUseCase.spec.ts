import { CalculateHomeInsuranceRiskUseCase } from '../../../../../../src/modules/risk-assessment/application/usecases/CalculateHomeInsuranceRiskUseCase'
import { HomeInformationRequest } from '../../../../../../src/modules/risk-assessment/input/request/HomeInformationRequest'
import { InsuranceScoreEnum } from '../../../../../../src/modules/risk-assessment/model'
import { HouseOwnershipEnum } from '../../../../../../src/modules/risk-assessment/model/HouseOwnershipEnum'

describe('RiskAssessment :: CalculateHomeInsuranceRiskUseCase', () => {
  let calculateHomeInsuranceRiskUseCase: CalculateHomeInsuranceRiskUseCase
  let baseInsuranceRisk: number

  beforeEach(async () => {
    baseInsuranceRisk = 2

    calculateHomeInsuranceRiskUseCase = new CalculateHomeInsuranceRiskUseCase()
  })

  it('Returns the the baseInsuranceRisk without modifier when house is owned', () => {
    const houseInformationMock: HomeInformationRequest = {
      ownership_status: HouseOwnershipEnum.OWNED
    }

    const response = calculateHomeInsuranceRiskUseCase.execute(
      baseInsuranceRisk,
      houseInformationMock
    )

    expect(response).toEqual(InsuranceScoreEnum.REGULAR)
  })

  it('Returns the the baseInsuranceRisk with modifier when house is mortgaged', () => {
    const houseInformationMock: HomeInformationRequest = {
      ownership_status: HouseOwnershipEnum.MORTGAGED
    }

    const response = calculateHomeInsuranceRiskUseCase.execute(
      baseInsuranceRisk,
      houseInformationMock
    )

    expect(response).toEqual(InsuranceScoreEnum.RESPONSIBLE)
  })

  it('Returns the the ineligible when client does not own a house', () => {
    const response =
      calculateHomeInsuranceRiskUseCase.execute(baseInsuranceRisk)

    expect(response).toEqual(InsuranceScoreEnum.INELIGIBLE)
  })
})
