import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from 'src/schemas/transaction.schema';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { JwtService } from '@nestjs/jwt';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    CategoriesModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, JwtService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
