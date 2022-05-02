import { ValidationException } from '@core/exceptions'
import { ValidationError, ValidationPipe } from '@nestjs/common'

export class CustomClassValidatorValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (errors: ValidationError[]) => {
        throw new ValidationException(
          this.mapValidationErrorsToStringArray(errors)
        )
      }
    })
  }

  private mapValidationErrorsToStringArray = (
    errors: ValidationError[]
  ): string[] => {
    const mappedErrors: string[] = errors.reduce(
      (acc: string[], err: ValidationError) => {
        if (err.children && err.children.length) {
          const childrenErrors: string[] =
            this.mapValidationErrorsToStringArray(err.children)
          return [...acc, ...childrenErrors]
        }

        if (err.constraints) {
          return [...acc, ...Object.values(err.constraints)]
        }

        return acc
      },
      []
    )

    return mappedErrors
  }
}
