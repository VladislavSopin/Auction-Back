import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator'
import { IsDifferent } from '@/user/utils/different.decorator'

export class SignUpDto {
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
  @IsEmail()
  email: string
}
