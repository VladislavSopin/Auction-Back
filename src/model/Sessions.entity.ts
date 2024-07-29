import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Sessions {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  accessToken: string

  @Column()
  refreshToken: string
}
