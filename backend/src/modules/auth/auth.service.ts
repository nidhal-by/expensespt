import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUser(email);
    if (!user) throw new UnauthorizedException();

    const passwordMatched = await bcrypt.compare(password, user?.password);

    if (!passwordMatched) {
      throw new UnauthorizedException();
    }
    const payload = {
      id: user._id,
      mail: user.mail,
      firstname: user.firstname,
      lastname: user.lastname,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
