import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { Config, RedisConfig } from '../../configs/config.type';
import { REDIS_CLIENT } from './models/redis.constants';
import { RedisService } from './services/redis.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: (configService: ConfigService<Config>) => {
        const config = configService.get<RedisConfig>('redis');
        return new Redis({
          port: config.port,
          host: config.host,
        });
      },
      inject: [ConfigService],
    },
    RedisService,
  ],
  exports: [RedisService, REDIS_CLIENT],
})
export class RedisModule {}
