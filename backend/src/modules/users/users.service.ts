import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { UpdateUserDto } from '../../dto/user/update-user.dto';
import { User } from '../../schemas/user.schema';
import { jwtConstants } from '../../common/constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    if (!createUserDto.mail || !createUserDto.password)
      throw new UnauthorizedException();

    // check if user does not exist already
    const user = await this.findOne(createUserDto.mail);
    if (user) throw new ConflictException();

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      jwtConstants.Rounds,
    );

    const createdUser = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const payload = {
      id: createdUser._id,
      mail: createdUser.mail,
      firstname: createdUser.firstname,
      lastname: createdUser.lastname,
    };
    // Create token for new user
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }

  async edit(id: string, updatedUser: Partial<User>): Promise<User> {
    return this.userModel.findByIdAndUpdate(
      id,
      { $set: updatedUser },
      { new: true },
    );
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userModel.findByIdAndUpdate(userId, updateUserDto);
  }

  async updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<User> {
    if (userId && oldPassword && newPassword) {
      const user = await this.userModel.findById(userId);
      if (!user) throw new UnauthorizedException();

      const passwordMatched = await bcrypt.compare(oldPassword, user?.password);

      if (!passwordMatched) {
        throw new UnauthorizedException();
      }

      const hashedPassword = await bcrypt.hash(
        newPassword,
        jwtConstants.Rounds,
      );

      return await this.userModel
        .findByIdAndUpdate(userId, {
          password: hashedPassword,
        })
        .select('-password');
    } else throw new UnauthorizedException();
  }

  async findOne(mail: string): Promise<User> {
    return this.userModel.findOne({ mail: mail }).select('-password').exec();
  }

  async getUser(mail: string): Promise<User> {
    return this.userModel.findOne({ mail: mail }).exec();
  }

  async setBudget(userId: string, budget: Array<any>): Promise<User> {
    return await this.userModel
      .findByIdAndUpdate(userId, { budget: budget }, { new: true })
      .select('-password');
  }

  async setAlert(userId: string, newAlert: any): Promise<User> {
    const alertKey = Object.keys(newAlert)[0];
    const user = await this.userModel.findById(userId);
    let valueExists;

    user.alerts.forEach((alert) => {
      if (alert.categoryId === alertKey) {
        valueExists = true;
        alert.alert = newAlert[alertKey];
      }
    });

    if (!valueExists) {
      user.alerts.push({
        categoryId: alertKey,
        alert: newAlert[alertKey],
      });
    }
    return await this.userModel
      .findByIdAndUpdate(userId, { alerts: user.alerts }, { new: true })
      .select('-password');
  }

  /*
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  */
}
