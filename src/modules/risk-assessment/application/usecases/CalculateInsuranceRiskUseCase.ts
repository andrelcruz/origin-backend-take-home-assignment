import { EnvironmentHelper } from '../../../../core/config/EnvironmentHelper'
import { CalculateRiskAssessmentRequest } from '../../input/request/CalculateRiskAssessmentRequest'
import { CalculateRiskAssessmentResponse } from '../../input/response/CalculateRiskAssessmentResponse'
import { CalculateAgeInsuranceModifierUseCase } from './CalculateAgeInsuranceModifierUseCase'
import { CalculateIncomeInsuranceModifierUseCase } from './CalculateIncomeInsuranceModifierUseCase'
import { CalculateVehicleInsuranceRiskUseCase } from './CalculateVehicleInsuranceRiskUseCase'

export class CalculateInsuranceRiskUseCase {
  public execute(
    calculateRiskAssessmentRequest: CalculateRiskAssessmentRequest
  ): CalculateRiskAssessmentResponse {
    const environmentConfig = EnvironmentHelper.getConfigAsObject()
    const { VEHICLE_INSURANCE } = environmentConfig
    const calculateVehicleInsuranceRiskUseCase =
      new CalculateVehicleInsuranceRiskUseCase(VEHICLE_INSURANCE.AGE_MODIFIER)

    const { age, income, vehicle, risk_questions } =
      calculateRiskAssessmentRequest

    const baseInsuranceRisk = this.getBaseInsuranceRisk(risk_questions)
    const ageModifier = this.getAgeModifier(age)
    const incomeModifier = this.getIncomeModifier(income)

    const modifiedBaseInsuranceRisk =
      baseInsuranceRisk + ageModifier + incomeModifier

    const vehicleInsuranceRisk = calculateVehicleInsuranceRiskUseCase.execute(
      modifiedBaseInsuranceRisk,
      vehicle
    )

    return {
      auto: vehicleInsuranceRisk
    }
  }

  private getAgeModifier(age: number) {
    const environmentConfig = EnvironmentHelper.getConfigAsObject()
    const { GENERIC_AGE_MODIFIERS } = environmentConfig

    const calculateAgeInsuranceModifierUseCase =
      new CalculateAgeInsuranceModifierUseCase(GENERIC_AGE_MODIFIERS)

    return calculateAgeInsuranceModifierUseCase.execute(age)
  }

  private getIncomeModifier(income: number) {
    const environmentConfig = EnvironmentHelper.getConfigAsObject()
    const { GENERIC_INCOME_MODIFIERS } = environmentConfig

    const calculateIncomeInsuranceModifierUseCase =
      new CalculateIncomeInsuranceModifierUseCase(GENERIC_INCOME_MODIFIERS)

    return calculateIncomeInsuranceModifierUseCase.execute(income)
  }

  private getBaseInsuranceRisk(insuranceRiskQuestions: number[]) {
    const baseInsuranceRisk = insuranceRiskQuestions.reduce(function (
      previousValue,
      currentValue
    ) {
      return previousValue + currentValue
    })

    return baseInsuranceRisk
  }
}
