import { HouseOwnershipEnum } from '@risk-assessment/model/HouseOwnershipEnum'
import { IsDefined, IsEnum } from 'class-validator'

export class HomeInformationRequest {
  @IsDefined()
  @IsEnum(HouseOwnershipEnum)
  ownership_status: HouseOwnershipEnum
}
