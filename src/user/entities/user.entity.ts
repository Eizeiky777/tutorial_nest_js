import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from './book.entity';

@Entity({ database: 'default' }) // sql table === 'user
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  class: number;

  @Column('json', { nullable: true })
  skills: string[];

  @JoinTable()
  @ManyToMany(() => Book, (book) => book.renter, {
    cascade: true,
  })
  books: string[];

  @Column({ default: 0 })
  coin: number;
}

export const UserFormatSample = {
  id: 123456,
  name: 'string',
  class: 123456,
  skills: [],
  books: null,
  coin: 123456,
};
