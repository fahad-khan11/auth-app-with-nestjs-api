import { Module } from '@nestjs/common';
import { AuthuserController } from './authuser.controller';
import { AuthuserService } from './authuser.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { JwtAuthGuard } from 'src/guards/guards.user';
import { JwtModule } from '@nestjs/jwt';
import { BlacklistToken, BlacklistTokenSchema } from './schema/blacklistToken.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    {name: BlacklistToken.name, schema : BlacklistTokenSchema}
  ]),
  JwtModule.register({
    secret: process.env.JWT_SECRET, 
  })
],
  
  controllers: [AuthuserController],
  providers: [AuthuserService,JwtAuthGuard],
  exports: [JwtAuthGuard]
})
export class AuthuserModule {}