import { Body, Controller, Post } from '@nestjs/common'
import { TestUseCase } from '../../application/usecases/TestUseCase'
import { CalculateRiskAssessmentRequest } from '../request'

@Controller('v1/risk-assessment')
export class RiskAssessmentController {
  constructor(private readonly testUseCase: TestUseCase) {}

  @Post()
  calculateRiskAssessment(
    @Body() calculateRiskAssessmentRequest: CalculateRiskAssessmentRequest
  ): void {
    console.log(calculateRiskAssessmentRequest)
  }
}
