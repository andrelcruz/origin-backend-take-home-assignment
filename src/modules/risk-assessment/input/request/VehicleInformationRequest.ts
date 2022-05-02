import { IsDefined, IsInt, Min } from 'class-validator'

export class VehicleInformationRequest {
  @IsDefined()
  @Min(1900)
  @IsInt()
  year: number
}
