import { Module } from '@nestjs/common'
import { RiskAssessmentModule } from './modules/risk-assessment/RiskAssessmentModule'

@Module({
  imports: [RiskAssessmentModule]
})
export class AppModule {}
