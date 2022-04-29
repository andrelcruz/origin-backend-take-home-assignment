import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Response } from 'express'
import { ValidationException } from '../exceptions/ValidationException'
import { HttpResult } from '../globals/HttpResult'

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch (exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>()
    HttpResult.BAD_REQUEST(response, [].concat(exception.message))
  }
}
