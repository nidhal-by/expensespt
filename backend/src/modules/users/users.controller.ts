import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { ExpensesAuthGuard } from '../auth/auth.guard';
import { ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBody({ type: [CreateUserDto] })
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(ExpensesAuthGuard)
  @ApiBody({ type: [CreateUserDto] })
  @Put('edit')
  async edit(@Body() editedUser: any) {
    if (editedUser.id)
      return await this.usersService.edit(editedUser.id, editedUser);
  }

  @UseGuards(ExpensesAuthGuard)
  @Put('updatePassword')
  async updatePassword(@Body() req: any) {
    if (req.id)
      return await this.usersService.updatePassword(
        req.id,
        req.oldPassword,
        req.newPassword,
      );
    else throw new UnauthorizedException();
  }

  @UseGuards(ExpensesAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    return await this.usersService.findOne(req.user.mail);
  }

  @UseGuards(ExpensesAuthGuard)
  @Put('budget')
  async setBudget(@Body() body, @Request() req) {
    if (!body.budget) return;

    try {
      const budget = JSON.parse(body.budget);
      const newBudget: Array<any> = [];

      for (const [categoryId, amount] of Object.entries(budget)) {
        newBudget.push({
          categoryId,
          amount: +amount,
        });
      }


      return await this.usersService.setBudget(req.user.id, newBudget);
    } catch (error) {
      return error;
    }
  }

  @UseGuards(ExpensesAuthGuard)
  @Put('alerts')
  async setAlert(@Body() body, @Request() req) {
    if (!body.alert) return;

    try {
      const alert = JSON.parse(body.alert);

      return await this.usersService.setAlert(req.user.id, alert);
    } catch (error) {
      return error;
    }
  }
}
