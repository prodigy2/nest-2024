import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { PostController } from './post.controller';

@Module({
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
