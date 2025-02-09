import { Injectable } from '@nestjs/common';
import {
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { ConfigService } from '@nestjs/config';
import * as path from 'node:path';
import * as process from 'node:process';
import { UserEntity } from '../../database/entities/user.entity';
import { PostEntity } from '../../database/entities/post.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const postgresConfig = this.configService.get('database');
    console.log(postgresConfig);
    return {
      type: 'postgres',
      host: postgresConfig.host,
      port: postgresConfig.port,
      username: postgresConfig.user,
      password: postgresConfig.password,
      database: postgresConfig.dbName,
      entities: [
        UserEntity,
        PostEntity,
        path.join(
          process.cwd(),
          'dist',
          'src',
          'database',
          'entities',
          '*.entity.js',
        ),
      ],

      synchronize: false,
    };
  }
}
