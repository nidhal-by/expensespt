import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// MongoDB module
import { MongooseModule } from '@nestjs/mongoose';

// Mails Modules

// App modules
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { JwtService } from '@nestjs/jwt';
import { GlobalJwtModule } from './modules/auth/jwt.module';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/expenses-db'),
    UsersModule,
    AuthModule,
    TransactionsModule,
    GlobalJwtModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
