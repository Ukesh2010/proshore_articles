import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CustomJwtService } from './jwt.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, CustomJwtService],
})
export class AuthModule {}
