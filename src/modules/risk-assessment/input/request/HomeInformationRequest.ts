import { IsDefined, IsEnum } from 'class-validator'
import { HouseOwnershipEnum } from '../../model/HouseOwnershipEnum'

export class HomeInformationRequest {
  @IsDefined()
  @IsEnum(HouseOwnershipEnum)
  ownership_status: HouseOwnershipEnum
}
