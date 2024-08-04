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
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: 'zxc' })
  firstName?: string

  @IsString()
  @ApiProperty({ example: 'ghoul' })
  lastName?: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'cursedonelove' })
  login: string

  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({ example: 'pass' })
  password: string

  @IsNotEmpty()
  @IsStrongPassword()
  @IsDifferent('password')
  @ApiProperty({ example: 'pass' })
  confirmPass: string

  @IsNotEmpty()
  @IsEnum(UserRole)
  @ApiProperty({ example: UserRole.User })
  role: string

  @IsNotEmpty()
  @IsBase64()
  @ApiProperty({
    example: 'd3F3ZXFzZmRhc2RnYXNkZ2FzZGd2YWRzZ2RzaHJ0amt5dGtydGh3eWs=',
  })
  image: string

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'zxcghol@gmail.com' })
  email: string
}
