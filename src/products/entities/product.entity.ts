import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index(['name'])
@Entity({ database: 'default-postgres-2' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  price: number;

  @Column('json')
  information: Record<string, any>;
}

export const ProductFormatSample = {
  id: 123456,
  type: 'string',
  name: 'string',
  information: { key: 'value' },
};
