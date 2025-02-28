import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/authuser/schema/user.schema';
import { BlacklistToken, BlacklistTokenDocument } from 'src/authuser/schema/blacklistToken.schema';

interface AuthenticatedRequest extends Request {
  user?: UserDocument;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectModel('User') private userModel: Model<UserDocument>,
    @InjectModel('BlacklistToken') private blacklistTokenModel: Model<BlacklistTokenDocument>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = request.headers.authorization?.split(' ')[1];
    
    if (!token) {
      throw new UnauthorizedException('Unauthorized - No token provided');
    }

    const isBlacklisted = await this.blacklistTokenModel.findOne({token});
    if (isBlacklisted) {
      throw new UnauthorizedException('Unauthorized - Token blacklisted');
    }

    try {
      const decoded = this.jwtService.verify<{ _id: string ,email: string}>(token, { secret: process.env.JWT_SECRET });

      const user = await this.userModel.findById(decoded._id).select('+email');
      if (!user) {
        throw new UnauthorizedException('Unauthorized - User not found');
      }

      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized - Invalid token');
    }
  }
}
