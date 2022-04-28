import { Controller, Get } from '@nestjs/common'
import { TestUseCase } from '../../application/usecases/TestUseCase'

@Controller('test')
export class RiskAssessmentController {
  constructor(private readonly testUseCase: TestUseCase) {}

  @Get()
  getTest(): string {
    return this.testUseCase.execute()
  }
}
