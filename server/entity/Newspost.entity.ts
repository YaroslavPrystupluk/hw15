import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm'
import { User } from './User.entity'

@Entity()
@Index(['title', 'text'])
export class Newspost {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    title: string

  @Column()
    text: string

  @Column({ default: false })
    deleted: boolean

  @ManyToOne(() => User, (user) => user.newsposts)
    author: User
}
