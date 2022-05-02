import { HomeInformationRequest } from '@risk-assessment/input/request/HomeInformationRequest'
import { HouseOwnershipEnum } from '@risk-assessment/model/HouseOwnershipEnum'
import { InsuranceScoreEnum } from '@risk-assessment/model/InsuranceScoreEnum'
import { MaritalStatusEnum } from '@risk-assessment/model/MaritalStatusEnum'
import { BaseInsuranceCalculator } from './BaseInsuranceCalculator'
export class CalculateDisabilityInsuranceRiskUseCase extends BaseInsuranceCalculator {
  private disabilityMaxAgeAllowed: number
  constructor(disabilityMaxAgeAllowed: number) {
    super()
    this.disabilityMaxAgeAllowed = disabilityMaxAgeAllowed
  }

  public execute(
    baseInsuranceRisk: number,
    age: number,
    income: number,
    dependents: number,
    maritalStatus: MaritalStatusEnum,
    homeInformationRequest?: HomeInformationRequest
  ): InsuranceScoreEnum {
    const isEligible = this.isEligibleForInsurance(age, income)
    if (!isEligible) return InsuranceScoreEnum.INELIGIBLE

    const dependentsModifierValue = this.dependentsModifier(dependents)
    const maritalStatusModifierValue = this.maritalStatusModifier(maritalStatus)
    const houseOwnershipModifierValue = this.houseOwnershipModifier(
      homeInformationRequest
    )

    const disabilityInsuranceRiskValue =
      baseInsuranceRisk +
      dependentsModifierValue +
      maritalStatusModifierValue +
      houseOwnershipModifierValue

    return this.assessRisk(disabilityInsuranceRiskValue)
  }

  private isEligibleForInsurance(age: number, income: number): boolean {
    return age <= this.disabilityMaxAgeAllowed && income > 0
  }

  private dependentsModifier(dependents: number): number {
    if (dependents > 0) return 1
    return 0
  }

  private maritalStatusModifier(maritalStatus: MaritalStatusEnum): number {
    if (maritalStatus === MaritalStatusEnum.MARRIED) return -1
    return 0
  }

  private houseOwnershipModifier(
    houseInformation: HomeInformationRequest
  ): number {
    if (
      houseInformation &&
      houseInformation.ownership_status === HouseOwnershipEnum.MORTGAGED
    )
      return 1
    return 0
  }
}
