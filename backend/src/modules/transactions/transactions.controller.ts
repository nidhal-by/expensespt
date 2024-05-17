import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ExpensesAuthGuard } from '../auth/auth.guard';
import { TransactionDto } from 'src/dto/transaction/transaction.dto';
import { Transaction } from 'src/schemas/transaction.schema';
import { ApiBody } from '@nestjs/swagger';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @UseGuards(ExpensesAuthGuard)
  @Post('create')
  @ApiBody({ type: [TransactionDto] })
  async create(@Body() createTransactionDto: TransactionDto, @Request() req) {
    return await this.transactionService.create(
      createTransactionDto,
      req.user.id,
    );
  }

  @UseGuards(ExpensesAuthGuard)
  @Get('all')
  async getTransactions(@Request() req) {
    return await this.transactionService.findAll(
      req.user.id,
      req.query.sortBy,
      req.query.startDate,
      req.query.endDate,
      req.query.category,
    );
  }

  @UseGuards(ExpensesAuthGuard)
  @Get('tags')
  async getMyTags(@Request() req) {
    return await this.transactionService.getTransactionsTags(req.user.id);
  }

  @UseGuards(ExpensesAuthGuard)
  @Get('/:id')
  async findOne(@Request() req): Promise<Transaction> {
    return await this.transactionService.findOne(req.params.id, req.user.id);
  }

  @UseGuards(ExpensesAuthGuard)
  @Delete('/:id')
  async deleteOne(@Request() req): Promise<Transaction> {
    return await this.transactionService.deleteOne(req.params.id, req.user.id);
  }
}
