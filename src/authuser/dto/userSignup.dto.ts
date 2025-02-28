import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'John', description: 'First name of the user', minLength: 3 })
  @IsNotEmpty()
  @MinLength(3)
  firstname: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user', minLength: 3 })
  @IsNotEmpty()
  @MinLength(3)
  lastname: string;

  @ApiProperty({ example: 'johndoe@example.com', description: 'Email of the user' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'securepassword', description: 'Password of the user', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
