import { IsDefined, IsEnum } from 'class-validator';
import { HouseOwnershipEnum } from '../../model/HouseOwnershipEnum';


export class HouseInformationRequest {
    @IsDefined()
    @IsEnum(HouseOwnershipEnum)
    ownership_status: string
}
