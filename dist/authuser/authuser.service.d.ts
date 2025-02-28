import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { SignupDto } from './dto/userSignup.dto';
import { LoginDto } from './dto/login.dto';
import { BlacklistTokenDocument } from './schema/blacklistToken.schema';
export declare class AuthuserService {
    private userModel;
    private blacklistTokenModel;
    constructor(userModel: Model<UserDocument>, blacklistTokenModel: Model<BlacklistTokenDocument>);
    creatUser(signUpDto: SignupDto): Promise<User>;
    loginUser(loginDto: LoginDto): Promise<{
        user: any;
        token: string;
    }>;
    getProfile(user: any): Promise<any>;
    logout(token: string): Promise<{
        message: string;
    }>;
}
