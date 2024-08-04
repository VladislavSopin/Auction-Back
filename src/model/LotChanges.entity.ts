import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Lot } from './Lot.entity'
import { User } from '../user/entities/user.entity'

@Entity()
export class LotChanges {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Lot, (lot) => lot.lotchanges)
  lot: Lot[]

  @Column()
  prevCost: string

  @Column()
  newCost: string

  @Column()
  image: string

  @ManyToOne(() => User, (user) => user.lotChanger)
  changer: User[]
}
