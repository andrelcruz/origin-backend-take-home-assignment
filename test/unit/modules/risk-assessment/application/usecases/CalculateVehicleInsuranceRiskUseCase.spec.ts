import { CalculateVehicleInsuranceRiskUseCase } from '@risk-assessment/application/usecases/CalculateVehicleInsuranceRiskUseCase'
import { VehicleInformationRequest } from '@risk-assessment/input/request/VehicleInformationRequest'
import { InsuranceScoreEnum } from '@risk-assessment/model'
import { InsuranceRiskModifierInterface } from '@risk-assessment/model/InsuranceRiskModifierInterface'

describe('RiskAssessment :: CalculateVehicleInsuranceRiskUseCase', () => {
  let calculateVehicleInsuranceRiskUseCase: CalculateVehicleInsuranceRiskUseCase
  let baseInsuranceRisk: number
  let ageInsuranceModifierConfigMock: InsuranceRiskModifierInterface

  beforeEach(async () => {
    ageInsuranceModifierConfigMock = {
      MIN_VALUE: 5,
      MODIFIER: 1
    }
    baseInsuranceRisk = 2

    calculateVehicleInsuranceRiskUseCase =
      new CalculateVehicleInsuranceRiskUseCase(ageInsuranceModifierConfigMock)
  })

  it('Returns the the baseInsuranceRisk without modifier when vehicle year is not in threshold', () => {
    const currentYear = new Date().getFullYear()
    const vehicleInformationMock: VehicleInformationRequest = {
      year: currentYear - 10
    }

    const response = calculateVehicleInsuranceRiskUseCase.execute(
      baseInsuranceRisk,
      vehicleInformationMock
    )

    expect(response).toEqual(InsuranceScoreEnum.REGULAR)
  })

  it('Returns the the baseInsuranceRisk with modifier when vehicle year is within threshold', () => {
    const currentYear = new Date().getFullYear()
    const vehicleInformationMock: VehicleInformationRequest = {
      year: currentYear - 3
    }

    const response = calculateVehicleInsuranceRiskUseCase.execute(
      baseInsuranceRisk,
      vehicleInformationMock
    )

    expect(response).toEqual(InsuranceScoreEnum.RESPONSIBLE)
  })

  it('Returns the the ineligible when client does not own a car', () => {
    const response = calculateVehicleInsuranceRiskUseCase.execute(null)

    expect(response).toEqual(InsuranceScoreEnum.INELIGIBLE)
  })
})
