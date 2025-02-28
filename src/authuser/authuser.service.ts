import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { SignupDto } from './dto/userSignup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { BlacklistToken, BlacklistTokenDocument } from './schema/blacklistToken.schema';

@Injectable()
export class AuthuserService {
    constructor(
        @InjectModel(User.name) private userModel : Model<UserDocument>,
        @InjectModel(BlacklistToken.name) private blacklistTokenModel: Model<BlacklistTokenDocument>
){}

    async creatUser(signUpDto:SignupDto):Promise<User> {
        const {firstname,lastname,email,password} = signUpDto;

        if(!firstname || !lastname || !email || !password){
            throw new Error("All fields are required");
        }

        const existingUser = await this.userModel.findOne({email});
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

       const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({
            firstname,
            lastname,
            email,
            password:hashedPassword
        });

        return newUser.save();
    }

    async loginUser(loginDto:LoginDto):Promise<{ user: any; token: string }> {
        const{email,password} = loginDto;

        const user = await this.userModel.findOne
        ({email}).select('+password').exec();

        if(!user){
            throw new UnauthorizedException("invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            throw new UnauthorizedException("invalid email or password");
        }

        const token = jwt.sign(
            { _id: user._id.toString(), email: user.email },
            process.env.JWT_SECRET||'12345werer',
            { expiresIn: '24h' }
          );
        return {user,token}
    } 

    async getProfile(user: any) {
        return user; 
      }

    async logout(token:string):Promise<{message:string}>{
        if(!token){
            throw new UnauthorizedException('no token is provided');
        }
        await this.blacklistTokenModel.create({token});
        return {message:'logout successful'};
    } 
}
