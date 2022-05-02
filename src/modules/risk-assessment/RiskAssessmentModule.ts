import { Module } from '@nestjs/common'
import {
  CalculateAgeInsuranceModifierUseCase,
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
    CalculateInsuranceRiskUseCase
  ]
})
export class RiskAssessmentModule {}
