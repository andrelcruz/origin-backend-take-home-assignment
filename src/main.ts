import { EnvironmentHelper } from '@core/config/EnvironmentHelper'
import { ValidationExceptionFilter } from '@core/filters'
import { CustomClassValidatorValidationPipe } from '@core/pipes'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './AppModule'

async function bootstrap() {
  const CONFIG = EnvironmentHelper.getConfigAsObject()
  const { PORT } = CONFIG.API
  
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new ValidationExceptionFilter())

  app.useGlobalPipes(new CustomClassValidatorValidationPipe())
  await app.listen(PORT)
}
bootstrap()
