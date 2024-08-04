import {
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsStrongPassword,
  IsString,
  IsBase64,
} from 'class-validator'
import { IsDifferent } from '../utils/different.decorator'
import { UserRole } from '../utils/role.enum'

export class CreateUserDto {
  @IsString()
  firstName?: string

  @IsString()
  lastName?: string

  @IsNotEmpty()
  @IsString()
  login: string

  @IsNotEmpty()
  @IsStrongPassword()
  password: string

  @IsNotEmpty()
  @IsStrongPassword()
  @IsDifferent('password')
  confirmPass: string

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: string

  @IsNotEmpty()
  @IsBase64()
  image: string

  @IsNotEmpty()
  @IsEmail()
  email: string
}
