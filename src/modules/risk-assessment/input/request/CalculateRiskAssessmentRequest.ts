import { MaritalStatusEnum } from '@risk-assessment/model'
import { Type } from 'class-transformer'
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsEnum,
  IsInt,
  IsOptional,
  Max,
  Min,
  ValidateNested
} from 'class-validator'
import { HomeInformationRequest } from './HomeInformationRequest'
import { VehicleInformationRequest } from './VehicleInformationRequest'

export class CalculateRiskAssessmentRequest {
  @IsDefined()
  @Min(0)
  @IsInt()
  age: number

  @IsDefined()
  @Min(0)
  @IsInt()
  dependents: number

  @IsDefined()
  @Min(0)
  @IsInt()
  income: number

  @IsDefined()
  @IsEnum(MaritalStatusEnum)
  marital_status: MaritalStatusEnum

  @IsDefined()
  @IsArray()
  @ArrayMinSize(3)
  @ArrayMaxSize(3)
  @Min(0, { each: true })
  @Max(1, { each: true })
  risk_questions: number[]

  @IsOptional()
  @ValidateNested()
  @Type(() => HomeInformationRequest)
  house?: HomeInformationRequest

  @IsOptional()
  @ValidateNested()
  @Type(() => VehicleInformationRequest)
  vehicle?: VehicleInformationRequest
}
