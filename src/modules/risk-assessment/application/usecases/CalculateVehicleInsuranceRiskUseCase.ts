import { VehicleInformationRequest } from '@risk-assessment/input/request/VehicleInformationRequest'
import { InsuranceRiskModifierInterface } from '@risk-assessment/model/InsuranceRiskModifierInterface'
import { InsuranceScoreEnum } from '@risk-assessment/model/InsuranceScoreEnum'
import { BaseInsuranceCalculator } from './BaseInsuranceCalculator'
export class CalculateVehicleInsuranceRiskUseCase extends BaseInsuranceCalculator {
  private vehicleAgeModifierConfig: InsuranceRiskModifierInterface
  constructor(vehicleAgeModifierConfig: InsuranceRiskModifierInterface) {
    super()
    this.vehicleAgeModifierConfig = vehicleAgeModifierConfig
  }

  public execute(
    baseInsuranceRisk: number,
    vehicleInformationRequest?: VehicleInformationRequest
  ): InsuranceScoreEnum {
    const isEligible = this.isEligibleForInsurance(vehicleInformationRequest)
    if (!isEligible) return InsuranceScoreEnum.INELIGIBLE

    const ageModifier = this.vehicleAgeModifier(
      vehicleInformationRequest.year,
      this.vehicleAgeModifierConfig.MIN_VALUE,
      this.vehicleAgeModifierConfig.MODIFIER
    )

    const vehicleInsuranceRiskValue = baseInsuranceRisk + ageModifier

    return this.assessRisk(vehicleInsuranceRiskValue)
  }

  private isEligibleForInsurance(
    vehicleInformationRequest?: VehicleInformationRequest
  ): boolean {
    return !!vehicleInformationRequest
  }

  private vehicleAgeModifier(
    vehicleYear: number,
    ageThreshold: number,
    modifier: number
  ): number {
    const currentYear = new Date().getFullYear()
    if (currentYear - vehicleYear < ageThreshold) return modifier
    return 0
  }
}
