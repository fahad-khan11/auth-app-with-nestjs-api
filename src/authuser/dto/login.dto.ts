import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'johndoe@example.com', description: 'Email of the user' })
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @ApiProperty({ example: 'your password', description: 'Password of the user', minLength: 6 })
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}