import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  IsDateString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @Transform(({ value }) => value.trim())
  @ApiProperty({ required: false })
  @MinLength(3)
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @Transform(({ value }) => value.trim())
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/, {
    message:
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character.',
  })
  @IsString()
  password: string;

  @ApiProperty({ required: true }) // Cambia a false se opzionale
  @IsNotEmpty()
  @IsDateString({}, { message: 'Date must be in format YYYY-MM-DD' })
  date: string;
}
