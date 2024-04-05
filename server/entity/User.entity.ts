import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm'
import { Newspost } from './Newspost.entity'

@Entity()
@Index(['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    email: string

  @Column()
    password: string

  @Column({ default: false })
    deleted: boolean

  @OneToMany(() => Newspost, (newspost) => newspost.author, {
    //  onDelete: "CASCADE",
  })
    newsposts: Newspost[]

  static saveMany: any
}
