import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Model } from 'mongoose';
import { Account, AccountDocument } from './entities/account.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const createdAccount = await this.accountModel.create(createAccountDto);
    console.log('createdAccount:', createdAccount);
    return createdAccount.save();
  }

  findAll() {
    return `This action returns all accounts`;
  }

  async findOne(id: string) {
    return this.accountModel.findById(id);
  }

  update(id: string, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: string) {
    return `This action removes a #${id} account`;
  }
}
