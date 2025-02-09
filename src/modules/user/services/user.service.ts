import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from '../dto/req/create-user.dto';
import { UpdateUserDto } from '../dto/req/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  private usersList = [];
  async create(createUserDto: CreateUserDto) {
    const index = new Date().valueOf();
    this.usersList.push({
      ...createUserDto,
      id: index,
    });
    return this.usersList[0];
  }

  async findAll(): Promise<any> {
    return `This action returns all user`;
  }

  async findOne(id: number): Promise<any> {
    throw new UnprocessableEntityException('This action returns a #');
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
