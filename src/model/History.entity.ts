import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm'
import { Lot } from './Lot.entity'
import { User } from '../user/entities/user.entity'

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Lot, (lot) => lot.user)
  lot: Lot[]

  @OneToOne(() => User, (user) => user.buyer)
  buyer: User

  @OneToOne(() => User, (user) => user.seller)
  seller: User

  @Column()
  note: string
}
