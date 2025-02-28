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
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
let JwtAuthGuard = class JwtAuthGuard {
    constructor(jwtService, userModel, blacklistTokenModel) {
        this.jwtService = jwtService;
        this.userModel = userModel;
        this.blacklistTokenModel = blacklistTokenModel;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new common_1.UnauthorizedException('Unauthorized - No token provided');
        }
        const isBlacklisted = await this.blacklistTokenModel.findOne({ token });
        if (isBlacklisted) {
            throw new common_1.UnauthorizedException('Unauthorized - Token blacklisted');
        }
        try {
            const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            const user = await this.userModel.findById(decoded._id).select('+email');
            if (!user) {
                throw new common_1.UnauthorizedException('Unauthorized - User not found');
            }
            request.user = user;
            return true;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Unauthorized - Invalid token');
        }
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __param(2, (0, mongoose_1.InjectModel)('BlacklistToken')),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_2.Model,
        mongoose_2.Model])
], JwtAuthGuard);
//# sourceMappingURL=guards.user.js.map