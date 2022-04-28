import { Injectable } from '@nestjs/common'

@Injectable()
export class TestUseCase {
  execute(): string {
    return 'Hello World!'
  }
}
