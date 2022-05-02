import { Module } from '@nestjs/common'
import { RiskAssessmentModule } from '@risk-assessment/RiskAssessmentModule'

@Module({
  imports: [RiskAssessmentModule]
})
export class AppModule {}
