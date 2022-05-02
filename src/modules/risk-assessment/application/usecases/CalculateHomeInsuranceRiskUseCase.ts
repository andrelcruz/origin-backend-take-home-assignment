import { HomeInformationRequest } from '@risk-assessment/input/request/HomeInformationRequest'
import { HouseOwnershipEnum } from '@risk-assessment/model/HouseOwnershipEnum'
import { InsuranceScoreEnum } from '@risk-assessment/model/InsuranceScoreEnum'
import { BaseInsuranceCalculator } from './BaseInsuranceCalculator'
export class CalculateHomeInsuranceRiskUseCase extends BaseInsuranceCalculator {
  public execute(
    baseInsuranceRisk: number,
    homeInformationRequest?: HomeInformationRequest
  ): InsuranceScoreEnum {
    const isEligible = this.isEligibleForInsurance(homeInformationRequest)
    if (!isEligible) return InsuranceScoreEnum.INELIGIBLE

    const ownershipModifier = this.homeOwnershipModifier(
      homeInformationRequest.ownership_status
    )

    const homeInsuranceRiskValue = baseInsuranceRisk + ownershipModifier
    return this.assessRisk(homeInsuranceRiskValue)
  }

  private isEligibleForInsurance(
    homeInformationRequest?: HomeInformationRequest
  ): boolean {
    return !!homeInformationRequest
  }

  private homeOwnershipModifier(ownershipStatus: HouseOwnershipEnum): number {
    if (ownershipStatus === HouseOwnershipEnum.MORTGAGED) return 1

    return 0
  }
}
