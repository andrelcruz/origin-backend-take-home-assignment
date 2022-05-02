import { Body, Controller, Post } from '@nestjs/common'
import { EnvironmentHelper } from '../../../../core/config/EnvironmentHelper'
import { CalculateInsuranceRiskUseCase } from '../../application/usecases/CalculateInsuranceRiskUseCase'
import { CalculateRiskAssessmentRequest } from '../request'
import { CalculateRiskAssessmentResponse } from '../response/CalculateRiskAssessmentResponse'

@Controller('v1/risk-assessment')
export class RiskAssessmentController {
  constructor(
    private readonly calculateInsuranceRiskUseCase: CalculateInsuranceRiskUseCase
  ) {}

  @Post()
  calculateRiskAssessment(
    @Body() calculateRiskAssessmentRequest: CalculateRiskAssessmentRequest
  ): CalculateRiskAssessmentResponse {
    const config = EnvironmentHelper.getConfigAsObject()

    return this.calculateInsuranceRiskUseCase.execute(
      calculateRiskAssessmentRequest
    )
  }
}
