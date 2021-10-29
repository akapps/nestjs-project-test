import { Injectable, Logger } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Model } from 'mongoose';
import { Account, AccountDocument } from './entities/account.schema';
import { InjectModel } from '@nestjs/mongoose';
import { IncompatibleRolesError } from './filters/incompatible-roles.filter';

@Injectable()
export class AccountsService {
  private readonly logger = new Logger(AccountsService.name);

  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const createdAccount = await this.accountModel.create(createAccountDto);
    this.logger.log('createdAccount:', createdAccount);
    return createdAccount.save();
  }

  findAll() {
    return `This action returns all accounts`;
  }

  async findOne(id: string) {
    return this.accountModel.findById(id);
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    const persistedAccount = await this.accountModel.findById(id);
    if (updateAccountDto.roles !== undefined) {
      protectUndueOwnership(updateAccountDto.roles, persistedAccount);
    }
    return `This action updates a #${id} account`;
  }

  remove(id: string) {
    return `This action removes a #${id} account`;
  }
}

/* simulates a check that would be done by a 3rd-party library - or anywhere non-http exceptions would be raised */
function protectUndueOwnership(
  newRoles: readonly string[],
  account: AccountDocument,
) {
  if (newRoles.includes('owner') && !account.email.endsWith('digidna.net')) {
    throw new IncompatibleRolesError('Only DigiDNA users can become owners');
  }
}
