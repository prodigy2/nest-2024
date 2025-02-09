import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { Match } from '../../../../common/decorators/password.decorator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  status: boolean;
}
export class ForgotPassword {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/, {
    message:
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character.',
  })
  @IsString()
  password: string;

  @ApiProperty()
  @Match('password', { message: 'Passwords do not match' })
  @IsString()
  confirmPassword: string;
}
export class SingUpDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  createdAt: Date;
}

export class UserItemDto extends SingUpDto {
  @ApiProperty()
  age: number;
}
