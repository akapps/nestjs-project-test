import { Injectable } from '@nestjs/common';
import { User, UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      const { password, ...copyWithoutPassword } = user;
      return copyWithoutPassword;
    }
    return null;
  }
}
