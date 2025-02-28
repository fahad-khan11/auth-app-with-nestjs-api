"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthuserModule = void 0;
const common_1 = require("@nestjs/common");
const authuser_controller_1 = require("./authuser.controller");
const authuser_service_1 = require("./authuser.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schema/user.schema");
const guards_user_1 = require("../guards/guards.user");
const jwt_1 = require("@nestjs/jwt");
const blacklistToken_schema_1 = require("./schema/blacklistToken.schema");
let AuthuserModule = class AuthuserModule {
};
exports.AuthuserModule = AuthuserModule;
exports.AuthuserModule = AuthuserModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: blacklistToken_schema_1.BlacklistToken.name, schema: blacklistToken_schema_1.BlacklistTokenSchema }
            ]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
            })
        ],
        controllers: [authuser_controller_1.AuthuserController],
        providers: [authuser_service_1.AuthuserService, guards_user_1.JwtAuthGuard],
        exports: [guards_user_1.JwtAuthGuard]
    })
], AuthuserModule);
//# sourceMappingURL=authuser.module.js.map