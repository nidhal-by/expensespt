import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Category } from '../../schemas/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { CategoryDto } from '../../dto/category/category.dto';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @Inject('DEFAULT_CATEGORIES')
    private readonly defaultCategories: Category[],
  ) {}

  async create(
    createCategoryDto: CategoryDto,
    userId: string,
  ): Promise<Category> {
    const createdCategory = await this.categoryModel.create({
      id: uuidv4(),
      user: userId,
      default: false,
      ...createCategoryDto,
    });
    return createdCategory;
  }

  async findMyCategories(userId: string): Promise<Category[]> {
    return await this.categoryModel
      .find({ user: userId })
      .select(['-__v', '-_id'])
      .exec();
  }

  getDefaultCategories(): Category[] {
    return this.defaultCategories;
  }

  async getAvailableCategories(userId: string): Promise<Category[]> {
    const myCategories = await this.findMyCategories(userId);
    return [...this.getDefaultCategories(), ...myCategories];
  }

  async getCategory(categoryId: string): Promise<Category | any> {
    if (categoryId.includes('CATEGORY')) {
      return this.defaultCategories.find(
        (category) => category.id === categoryId,
      );
    } else if (uuidValidate(categoryId)) {
      return await this.categoryModel
        .findOne({ id: categoryId })
        .select(['-__v', '-_id']);
    }

    return {};
  }

  async deleteOne(categoryId: string, userId: string): Promise<Category | any> {
    if (uuidValidate(categoryId)) {
      const category: Category = await this.categoryModel
        .findOne({ id: categoryId })
        .lean();

      if (category.user !== userId) throw new NotFoundException();

      return await this.categoryModel.deleteOne({ id: categoryId });
    }

    return {};
  }
}
