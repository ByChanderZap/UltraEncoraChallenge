import { Publisher } from 'src/publishers/publishers.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  price: number;

  @ManyToOne((_type) => Publisher, (publisher) => publisher.games, {
    eager: true,
  })
  publisher: Publisher;

  @Column('simple-array')
  tags: string[];

  @Column({ type: 'date' })
  releaseDate: string;

  @DeleteDateColumn()
  deletedAt?: Date;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  UpdatedAt?: Date;
}
