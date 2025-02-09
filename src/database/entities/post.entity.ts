import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity('post')
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  body: string;

  @Column('text')
  comment?: string;

  @Column()
  user_id: string;

  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
