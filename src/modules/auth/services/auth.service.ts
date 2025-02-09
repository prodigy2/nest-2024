import {
  Injectable,
  Inject,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import Redis from 'ioredis'; // Assicurati di importare Redis da ioredis
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../../database/entities/user.entity';
import { CreateUserDto } from '../../user/dto/req/create-user.dto';
import { ForgotPassword } from '../../user/dto/req/update-user.dto';
import { UpdateAuthDto } from '../dto/req/update-auth.dto';

@Injectable()
export class AuthService {
  private redisUserKey = 'user-token';

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly jwtService: JwtService,

    @Inject('REDIS_CLIENT') private readonly redisClient: Redis, // Iniezione del client Redis
  ) {}

  async singUpUser(data: CreateUserDto): Promise<{ accessToken: string }> {
    const findUser = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (findUser) {
      throw new BadRequestException('User with this email already exist.');
    }
    const password = await bcrypt.hash(data.password, 10);
    const user: UserEntity = await this.userRepository.save(
      this.userRepository.create({ ...data, password }),
    );

    const token = await this.singIn(user.id, user.email);

    await this.redisClient.setex(
      `${this.redisUserKey}-${user.id}`,
      24 * 60 * 60, // Tempo di scadenza di 24 ore
      token,
    );

    return { accessToken: token };
  }

  async validateUser(userId: string, userEmail: string): Promise<UserEntity> {
    if (!userId || !userEmail) {
      throw new UnauthorizedException();
    }
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
        email: userEmail,
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async singIn(userId: string, userEmail: string): Promise<string> {
    return this.jwtService.sign({ id: userId, email: userEmail });
  }

  async compareHash(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  async login(data: any) {
    const findUser = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (!findUser) {
      throw new BadRequestException('Wrong email or password.');
    }

    if (!(await this.compareHash(data.password, findUser.password))) {
      throw new BadRequestException('Wrong email or password.');
    }

    const token = await this.singIn(findUser.id, findUser.email);

    await this.redisClient.setex(
      `${this.redisUserKey}-${findUser.id}`,
      24 * 60 * 60, // Tempo di scadenza di 24 ore
      token,
    );

    return { accessToken: token };
  }

  async validate(token: string) {
    try {
      return this.jwtService.verifyAsync(token);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  create(data: ForgotPassword) {
    if (data.password !== data.confirmPassword) {
      // Gestire l'errore di password non corrispondenti
    }
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
