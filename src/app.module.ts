import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ArticleModule } from './modules/article/article.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './env.validation';
import { FileModule } from './file/file.module';
import { GuardModule } from './guard/guard.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CustomSuccessResponseInterceptor } from './middleware/custom-response.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ validate, isGlobal: true }),
    PassportModule.register({ session: false }),
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
      },
    }),
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     return {
    //       global: true,
    //       secret: configService.getOrThrow<string>('ACCESS_TOKEN_SECRET'),
    //       signOptions: {
    //         expiresIn: configService.getOrThrow<string>('ACCESS_TOKEN_EXPIRES'),
    //       },
    //     };
    //   },
    // }),
    AuthModule,
    ArticleModule,
    PrismaModule,
    FileModule,
    GuardModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CustomSuccessResponseInterceptor,
    },
  ],
})
export class AppModule {}
