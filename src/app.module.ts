import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { MongooseModule } from '@nestjs/mongoose';

const DB_URL =
  'mongodb://mongoadmin:admin@dockerhost:27017/iMazing-Account-DB-Test?authSource=admin&replicaSet=rs0&readPreference=primary&ssl=false';

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [
    MongooseModule.forRoot(DB_URL),
    AccountsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
