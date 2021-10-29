import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './entities/account.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  exports: [MongooseModule],
})
export class AccountsModule {}
