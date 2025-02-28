import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthuserModule } from './authuser/authuser.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
   
  imports: [

    MongooseModule.forRoot(process.env.DB_CONNECT as string),
    AuthuserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
