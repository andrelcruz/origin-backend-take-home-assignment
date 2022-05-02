import { Module } from '@nestjs/common'
import {
  CalculateAgeInsuranceModifierUseCase,
  CalculateDisabilityInsuranceRiskUseCase,
  CalculateHomeInsuranceRiskUseCase,
  CalculateIncomeInsuranceModifierUseCase,
  CalculateInsuranceRiskUseCase,
  CalculateVehicleInsuranceRiskUseCase
} from './application/usecases'
import { RiskAssessmentController } from './input/controller/RiskAssessmentController'

@Module({
  controllers: [RiskAssessmentController],
  providers: [
    CalculateAgeInsuranceModifierUseCase,
    CalculateIncomeInsuranceModifierUseCase,
    CalculateVehicleInsuranceRiskUseCase,
    CalculateInsuranceRiskUseCase,
    CalculateHomeInsuranceRiskUseCase,
    CalculateDisabilityInsuranceRiskUseCase
  ]
})
export class RiskAssessmentModule {}
