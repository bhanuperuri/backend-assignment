import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Bhanu@123', // your password
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
