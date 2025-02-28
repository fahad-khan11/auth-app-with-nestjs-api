import { AuthuserService } from './authuser.service';
import { SignupDto } from './dto/userSignup.dto';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
export declare class AuthuserController {
    private readonly userService;
    constructor(userService: AuthuserService);
    creatUser(signUpDto: SignupDto): Promise<import("./schema/user.schema").User>;
    loginUser(loginDto: LoginDto): Promise<{
        user: any;
        token: string;
    }>;
    getProfile(req: Request): Promise<any>;
    logout(req: Request): Promise<{
        message: string;
    }>;
}
