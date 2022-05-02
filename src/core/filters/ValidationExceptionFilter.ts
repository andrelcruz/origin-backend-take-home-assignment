import { ValidationException } from '@core/exceptions/ValidationException'
import { HttpResult } from '@core/globals/HttpResult'
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException
} from '@nestjs/common'
import { Response } from 'express'

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>()
    HttpResult.BAD_REQUEST(response, [].concat(exception.message))
  }
}
