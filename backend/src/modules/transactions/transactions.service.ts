import { Injectable, NotFoundException } from '@nestjs/common';
import { Transaction } from '../../schemas/transaction.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { TransactionDto } from '../../dto/transaction/transaction.dto';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
    private readonly categoryService: CategoriesService,
  ) {}

  async create(
    createTransactionDto: TransactionDto,
    userId: string,
  ): Promise<Transaction | any> {
    const addedTransaction = await this.transactionModel.create({
      ...createTransactionDto,
      user: userId,
    });
    const result = addedTransaction.toObject();
    result.category = await this.categoryService.getCategory(
      addedTransaction.category,
    );

    return result;
  }

  async findOne(
    transactionId: string,
    userId: string,
  ): Promise<Transaction | any> {
    if (mongoose.Types.ObjectId.isValid(transactionId)) {
      const transaction: Transaction = await this.transactionModel
        .findById(transactionId, null)
        .lean();

      if (transaction.user._id.toString() !== userId)
        throw new NotFoundException();

      const category = await this.categoryService.getCategory(
        transaction.category,
      );
      return {
        ...transaction,
        category,
      };
    }

    return {};
  }

  async findAll(
    userId: string,
    sortBy: string = undefined,
    startDate: Date = undefined,
    endDate: Date = undefined,
    category: string = undefined,
  ): Promise<Transaction | any[]> {
    interface Filters {
      user?: string;
      date?: {
        $gte?: Date;
        $lte?: Date;
      };
      category?: string;
    }

    const filters: Filters = {};

    if (userId) {
      filters.user = userId;
    }

    if (startDate) {
      filters.date = {
        ...filters.date,
        $gte: startDate,
      };
    }

    if (endDate) {
      filters.date = {
        ...filters.date,
        $lte: endDate,
      };
    }

    if (category) {
      filters.category = category;
    }

    const transactions = await this.transactionModel
      .find(filters)
      .select(['-__v'])
      .sort(sortBy)
      .lean();

    return await this.populateCategory(transactions);
  }

  async findByPeriod(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Transaction | any[]> {
    const transactions = await this.transactionModel
      .find({ user: userId, date: { $gte: startDate, $lte: endDate } }, null, {
        lean: true,
      })
      .select(['-__v', '-_id'])
      .exec();

    return await this.populateCategory(transactions);
  }

  async populateCategory(transactions) {
    const results = transactions.map(async (transaction) => {
      const category = await this.categoryService.getCategory(
        transaction.category,
      );
      return {
        ...transaction,
        category,
      };
    });

    return Promise.all(results);
  }

  async getTransactionsTags(userId: string): Promise<string[]> {
    return await this.transactionModel
      .find({ user: userId })
      .distinct('tags')
      .exec();
  }

  async deleteOne(
    transactionId: string,
    userId: string,
  ): Promise<Transaction | any> {
    if (mongoose.Types.ObjectId.isValid(transactionId)) {
      const transaction: Transaction = await this.transactionModel
        .findById(transactionId, null)
        .lean();

      if (transaction.user._id.toString() !== userId)
        throw new NotFoundException();

      return await this.transactionModel.findByIdAndDelete(transactionId);
    }

    return {};
  }
}
