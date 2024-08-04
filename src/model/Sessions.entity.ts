import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Sessions {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  login: string

  @Column()
  refreshToken: string

  @Column()
  dateEnd: Date
}
