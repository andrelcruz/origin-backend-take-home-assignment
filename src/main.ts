import { NestFactory } from '@nestjs/core'
import { AppModule } from './AppModule'
import { ValidationExceptionFilter } from './core/filters'
import { CustomClassValidatorValidationPipe } from './core/pipes'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalFilters(
    new ValidationExceptionFilter()
  )

  app.useGlobalPipes(new CustomClassValidatorValidationPipe())
  await app.listen(3000)
}
bootstrap()
