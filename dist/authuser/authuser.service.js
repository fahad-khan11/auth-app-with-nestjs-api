"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthuserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schema/user.schema");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistToken_schema_1 = require("./schema/blacklistToken.schema");
let AuthuserService = class AuthuserService {
    constructor(userModel, blacklistTokenModel) {
        this.userModel = userModel;
        this.blacklistTokenModel = blacklistTokenModel;
    }
    async creatUser(signUpDto) {
        const { firstname, lastname, email, password } = signUpDto;
        if (!firstname || !lastname || !email || !password) {
            throw new Error("All fields are required");
        }
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new common_1.ConflictException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({
            firstname,
            lastname,
            email,
            password: hashedPassword
        });
        return newUser.save();
    }
    async loginUser(loginDto) {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email }).select('+password').exec();
        if (!user) {
            throw new common_1.UnauthorizedException("invalid email or password");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("invalid email or password");
        }
        const token = jwt.sign({ _id: user._id.toString(), email: user.email }, process.env.JWT_SECRET || '12345werer', { expiresIn: '24h' });
        return { user, token };
    }
    async getProfile(user) {
        return user;
    }
    async logout(token) {
        if (!token) {
            throw new common_1.UnauthorizedException('no token is provided');
        }
        await this.blacklistTokenModel.create({ token });
        return { message: 'logout successful' };
    }
};
exports.AuthuserService = AuthuserService;
exports.AuthuserService = AuthuserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(blacklistToken_schema_1.BlacklistToken.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], AuthuserService);
//# sourceMappingURL=authuser.service.js.map