import { ApiProperty } from '@nestjs/swagger'
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator'

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'zxcghoul' })
  login: string

  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({ example: 'pass' })
  password: string

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: false })
  stayLoginedIn: boolean
  constructor() {
    this.stayLoginedIn = false
  }
}
