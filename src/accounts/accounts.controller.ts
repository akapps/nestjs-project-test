import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseFilters,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { IncompatibleRolesFilter } from './filters/incompatible-roles.filter';

@Controller('accounts')
@UseFilters(IncompatibleRolesFilter) // broader filters could be bound to the app: app.useGlobalFilters(..)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  /**
   * Creates a new account
   */
  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  findAll(): string {
    return this.accountsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const account = await this.accountsService.findOne(id);
    if (account == null) {
      throw new NotFoundException(`No account found with id=${id}`);
    }
    return account;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(id);
  }
}
