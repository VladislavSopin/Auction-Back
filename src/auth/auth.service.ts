import { User } from '@/user/entities/user.entity'
import { UserService } from '@/user/user.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SignUpDto } from './dto/sign-up.dto'
import { CreateUserDto } from '@/user/dto/create-user.dto'
import { UserRole } from '@/user/utils/role.enum'
import { SignInDto } from './dto/sign-in.dto'
import { hash } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { v4 as uuidv4 } from 'uuid'
import * as moment from 'moment'
import { Sessions } from '@/model/Sessions.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(Sessions)
    private sessionRepository: Repository<Sessions>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const newUser = new CreateUserDto()
    Object.assign(newUser, signUpDto)
    newUser.role = UserRole.User
    newUser.image = newUser.lastName?.at(0) ?? newUser.login.at(0)
    await this.userService.create(newUser)
  }

  async signIn(signInDto: SignInDto) {
    const [user] = await this.userRepository.find({
      where: { login: signInDto.login, isVerifiet: true },
    })
    if (user === undefined) {
      throw new HttpException('Пользователи не найдены', HttpStatus.BAD_REQUEST)
    }

    const hashedPassword = await hash(signInDto.password, user.salt)

    if (hashedPassword != user.password) {
      throw new HttpException(
        'Не верный логин или пароль',
        HttpStatus.BAD_REQUEST,
      )
    }

    const { password, id, salt, isVerifiet, ...payload } = user

    const accessToken = await this.jwtService.signAsync(payload)
    const refreshToken = uuidv4()

    const dateOfEndSession = signInDto.stayLoginedIn
      ? moment().add(3, 'day')
      : moment().add(10, 'minute')

    const session = this.sessionRepository.create({
      login: user.login,
      refreshToken,
      dateEnd: dateOfEndSession,
    })
    await this.sessionRepository.save(session)
    return { accessToken, refreshToken }
  }
}
