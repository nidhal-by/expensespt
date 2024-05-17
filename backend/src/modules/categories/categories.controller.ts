import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ExpensesAuthGuard } from '../auth/auth.guard';
import { CategoryDto } from 'src/dto/category/category.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(ExpensesAuthGuard)
  @Post('create')
  @ApiBody({ type: [CategoryDto] })
  async create(@Body() createCategoryDto: CategoryDto, @Request() req) {
    return await this.categoriesService.create(createCategoryDto, req.user.id);
  }

  @UseGuards(ExpensesAuthGuard)
  @Get('mine')
  async getMyCategories(@Request() req) {
    return await this.categoriesService.findMyCategories(req.user.id);
  }

  @Get('default')
  getDefaultCategories() {
    return this.categoriesService.getDefaultCategories();
  }

  @UseGuards(ExpensesAuthGuard)
  @Get('all')
  getAvailableCategories(@Request() req) {
    return this.categoriesService.getAvailableCategories(req.user.id);
  }

  @UseGuards(ExpensesAuthGuard)
  @Delete('/:id')
  async deleteOne(@Request() req) {
    return await this.categoriesService.deleteOne(req.params.id, req.user.id);
  }

  /*
  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  */
}
