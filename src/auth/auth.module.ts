import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [PassportModule],
  providers: [AuthService, UsersService, LocalStrategy],
})
export class AuthModule {}
