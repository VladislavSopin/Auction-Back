import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { UserRole } from '../utils/role.enum'
import { Transform } from 'class-transformer'

export class FilterUserDto {
  @IsString()
  @IsOptional()
  firstName?: string

  @IsString()
  @IsOptional()
  lastName?: string

  @IsOptional()
  @IsString()
  login?: string

  @IsOptional()
  @IsEnum(UserRole)
  role?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsNumber()
  @IsOptional()
  limit?: number

  @IsNumber()
  @IsOptional()
  offset?: number

  constructor() {
    this.limit = 50
    this.offset = 0
  }
}
