import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { User } from '../user/entities/user.entity'
import { History } from './History.entity'
import { LotChanges } from './LotChanges.entity'

@Entity()
export class Lot {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.lots)
  user: User

  @OneToMany(() => History, (history) => history.lot)
  histories: History[]

  @Column()
  image: string

  @Column()
  lotName: string

  @Column()
  note: string

  @Column()
  cost: string

  @Column()
  currency: string

  @OneToMany(() => LotChanges, (lotchange) => lotchange.lot)
  lotchanges: LotChanges[]
}
