import { Module } from '@nestjs/common'
import { TestUseCase } from './application/usecases/TestUseCase'
import { RiskAssessmentController } from './input/controller/RiskAssessmentController'

@Module({
  providers: [TestUseCase],
  controllers: [RiskAssessmentController]
})
export class RiskAssessmentModule {}
