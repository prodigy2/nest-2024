import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get,
  Patch,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';

import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SingUpDto } from '../user/dto/req/update-user.dto';
import { CreateUserDto } from '../user/dto/req/create-user.dto';
import { UpdateAuthDto } from './dto/req/update-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: SingUpDto })
  @Post('/register')
  create(@Body() body: CreateUserDto) {
    return this.authService.singUpUser(body);
  }

  // @Post()
  //   create(@Body() createAuthDto: ForgotPassword) {
  //     return this.authService.create(createAuthDto);
  //   }

  @Post('login')
  async login(@Body() body: any) {
    return this.authService.login(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
