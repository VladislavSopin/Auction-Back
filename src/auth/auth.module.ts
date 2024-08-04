import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { User } from '@/user/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from '@/user/user.service'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './jwt.constans'
import { Sessions } from '@/model/Sessions.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Sessions]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
