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
exports.AuthuserController = void 0;
const common_1 = require("@nestjs/common");
const authuser_service_1 = require("./authuser.service");
const userSignup_dto_1 = require("./dto/userSignup.dto");
const login_dto_1 = require("./dto/login.dto");
const guards_user_1 = require("../guards/guards.user");
const swagger_1 = require("@nestjs/swagger");
let AuthuserController = class AuthuserController {
    constructor(userService) {
        this.userService = userService;
    }
    async creatUser(signUpDto) {
        return this.userService.creatUser(signUpDto);
    }
    async loginUser(loginDto) {
        return this.userService.loginUser(loginDto);
    }
    async getProfile(req) {
        return this.userService.getProfile(req.user);
    }
    async logout(req) {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new common_1.BadRequestException('Token not provided');
        }
        await this.userService.logout(token);
        return { message: 'Logout successful' };
    }
};
exports.AuthuserController = AuthuserController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userSignup_dto_1.SignupDto]),
    __metadata("design:returntype", Promise)
], AuthuserController.prototype, "creatUser", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthuserController.prototype, "loginUser", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(guards_user_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthuserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('logout'),
    (0, common_1.UseGuards)(guards_user_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthuserController.prototype, "logout", null);
exports.AuthuserController = AuthuserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [authuser_service_1.AuthuserService])
], AuthuserController);
//# sourceMappingURL=authuser.controller.js.map