import { Body, Controller, Get, Post, Req, Res, UseGuards, BadRequestException } from '@nestjs/common';
import { AuthuserService } from './authuser.service';
import { SignupDto } from './dto/userSignup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/guards/guards.user';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Response, Request } from 'express';

@Controller('user')
export class AuthuserController {
    constructor(private readonly userService:AuthuserService){}
    @Post('register')
    async creatUser(@Body() signUpDto:SignupDto){
        return this.userService.creatUser(signUpDto);
    }

    @Post('login')
    async loginUser(@Body() loginDto:LoginDto){
        return this.userService.loginUser(loginDto);
    }
    
  @Get('profile')
  @UseGuards(JwtAuthGuard) 
  @ApiBearerAuth()
  async getProfile(@Req() req: Request) {
    return this.userService.getProfile((req as any).user); 
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async logout(@Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new BadRequestException('Token not provided');
    }
    await this.userService.logout(token);
    return { message: 'Logout successful' };
  }
}
