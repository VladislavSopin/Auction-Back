import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { genSalt, hash, compare } from 'bcrypt'
import { FilterUserDto } from './dto/filter-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const users = await this.userRepository.find({
      where: { login: createUserDto.login },
    })
    if (users.length > 0) {
      throw new HttpException(
        'Пользователь с таким логином уже присутствует',
        HttpStatus.BAD_REQUEST,
      )
    }

    const user = this.userRepository.create(createUserDto)

    Object.assign(user, await this.handlePassword(createUserDto.password))

    const result = await this.userRepository.save(user)
    delete result.password
    delete result.salt
    return result
  }

  async findAll(filterUserDto: FilterUserDto) {
    const { limit, offset, ...where } = filterUserDto

    const builder = this.userRepository
      .createQueryBuilder()
      .offset(offset)
      .limit(limit)
      .andWhere(where)

    const [data, count] = await builder.getManyAndCount()

    return { data, count, limit, offset }
  }

  findOne(id: number) {
    return this.userRepository.find({ where: { id } })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const [user] = await this.userRepository.find({
      where: { id },
    })
    if (user === undefined) {
      throw new HttpException(
        'Пользователь с таким id не найден',
        HttpStatus.BAD_REQUEST,
      )
    }

    const patchedUserDto = { ...user, ...updateUserDto }

    if (updateUserDto.password && updateUserDto.confirmPass) {
      Object.assign(
        patchedUserDto,
        await this.handlePassword(updateUserDto.password),
      )
    }

    await this.userRepository.update(id, patchedUserDto)

    await this.userRepository.save({ id })
    delete patchedUserDto.password
    delete patchedUserDto.salt
    return patchedUserDto
  }

  remove(id: number) {
    return this.userRepository.delete({ id })
  }

  private async handlePassword(password: string) {
    const salt = await genSalt(10)
    return { password: await hash(password, salt), salt }
  }
}
