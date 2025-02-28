import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/authuser/schema/user.schema';
import { BlacklistTokenDocument } from 'src/authuser/schema/blacklistToken.schema';
export declare class JwtAuthGuard implements CanActivate {
    private jwtService;
    private userModel;
    private blacklistTokenModel;
    constructor(jwtService: JwtService, userModel: Model<UserDocument>, blacklistTokenModel: Model<BlacklistTokenDocument>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
