import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from '../user/entities/user.entity'

@Entity()
export class UserConfirms {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.confirm)
  user: User

  @Column()
  code: string

  @Column()
  IP?: string
}
