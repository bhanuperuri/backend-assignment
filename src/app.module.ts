import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,   // 👈 THIS IS KEY
      ssl: {
        rejectUnauthorized: false,     // 👈 REQUIRED FOR RENDER
      },
      autoLoadEntities: true,
      synchronize: true,
    }),

    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
