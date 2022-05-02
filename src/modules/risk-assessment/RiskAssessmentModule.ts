import { Module } from '@nestjs/common'
import { CalculateInsuranceRiskUseCase } from './application/usecases'
import { RiskAssessmentController } from './input/controller/RiskAssessmentController'

@Module({
  controllers: [RiskAssessmentController],
  providers: [CalculateInsuranceRiskUseCase]
})
export class RiskAssessmentModule {}
