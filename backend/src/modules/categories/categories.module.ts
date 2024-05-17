import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/schemas/category.schema';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { defaultCategoriesProvider } from './defaultCategories';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, defaultCategoriesProvider],
  exports: [CategoriesService],
})
export class CategoriesModule {}
