import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',

      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      // 🔥 THIS IS THE IMPORTANT PART
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
