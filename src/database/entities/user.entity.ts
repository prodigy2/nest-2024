import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RefreshTokenEntity } from './refresh-token.entity';
import { BaseEntity } from './base.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: true })
  name: string;

  @Column('text', { nullable: false, unique: true })
  email: string;

  @Column('text', { nullable: false })
  password: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ nullable: true, default: null })
  phone?: string;

  @Column({ nullable: true, default: null })
  photo?: string;

  @Column('timestamp', { nullable: true })
  deleted?: Date;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens: RefreshTokenEntity[];
}
