import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',

      // ✅ USE DATABASE_URL
      url: process.env.DATABASE_URL,

      // ✅ REQUIRED FOR RENDER
      ssl: {
        rejectUnauthorized: false,
      },

      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),

    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
