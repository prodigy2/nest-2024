import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { CreateUserDto } from './dto/req/create-user.dto';
import { UpdateUserDto } from './dto/req/update-user.dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { UserResponseDto } from './dto/res/user.response.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ApiCreatedResponse({ type: UserResponseDto })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiUnprocessableEntityResponse({ description: 'Unprocessable entity' })
  @ApiConflictResponse({ description: 'Conflict' })
  public async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    console.log(createUserDto);
    return await this.userService.create(createUserDto);
  }

  @Get('/list')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
