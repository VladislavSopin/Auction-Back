import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm'
import { Lot } from './Lot.entity'
import { History } from './History.entity'
import { LotChanges } from './LotChanges.entity'
import { UserConfirms } from './UserConfirms.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName?: string

  @Column()
  lastName?: string

  @Column()
  login: string

  @Column()
  password: string

  @Column()
  salt: string

  @Column()
  role: string

  @Column()
  image: string

  @Column()
  isVerifiet: boolean

  @Column()
  email: string

  @OneToMany(() => Lot, (lot) => lot.user)
  lots: Lot[]

  @OneToOne(() => History, (history) => history.buyer)
  buyer: History[]

  @OneToOne(() => History, (history) => history.seller)
  seller: History[]

  @OneToMany(() => LotChanges, (lotChanger) => lotChanger.changer)
  lotChanger: LotChanges[]

  @OneToMany(() => UserConfirms, (confirm) => confirm.user)
  confirm: UserConfirms[]
}
