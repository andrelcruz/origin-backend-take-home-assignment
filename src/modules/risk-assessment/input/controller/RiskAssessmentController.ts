import { Body, Controller, Get, Post } from '@nestjs/common'
import { TestUseCase } from '../../application/usecases/TestUseCase'
import { CalculateRiskAssessmentRequest } from '../request'

@Controller('risk-assessment')
export class RiskAssessmentController {
  constructor(private readonly testUseCase: TestUseCase) {}

  @Get()
  getTest(): string {
    return this.testUseCase.execute()
  }

  @Post()
  calculateRiskAssessment(
    @Body() calculateRiskAssessmentRequest: CalculateRiskAssessmentRequest
  ): CalculateRiskAssessmentRequest {
    console.log(calculateRiskAssessmentRequest)
    return calculateRiskAssessmentRequest
  }
}
