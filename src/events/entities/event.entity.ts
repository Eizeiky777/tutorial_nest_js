import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index(['name', 'type'])
@Entity({ database: 'default' })
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({ nullable: true })
  name: string;

  @Column('json')
  payload: Record<string, any>;
}

export const EventFormatSample = {
  id: 123456,
  type: 'string',
  name: 'string',
  payload: { key: 'value' },
};
