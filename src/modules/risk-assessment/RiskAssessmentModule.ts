import { Module } from '@nestjs/common'
import {
  CalculateAgeInsuranceModifierUseCase,
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
    CalculateHomeInsuranceRiskUseCase
  ]
})
export class RiskAssessmentModule {}
