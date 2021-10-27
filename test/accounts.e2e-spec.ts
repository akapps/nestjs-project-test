import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AccountsService } from '../src/accounts/accounts.service';
import { AccountsModule } from '../src/accounts/accounts.module';
import { getModelToken } from '@nestjs/mongoose';
import { Account } from '../src/accounts/entities/account.schema';

const SAMPLE_ACCOUNT = { sample: true };

/*
NOTE: Those tests do NOT require a database to run
 */

describe('AccountsController (e2e)', () => {
  let app: INestApplication;
  const accountsService = { create: () => SAMPLE_ACCOUNT };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AccountsModule],
    })
      .overrideProvider(getModelToken(Account.name))
      .useValue(jest.fn())
      .overrideProvider(AccountsService)
      .useValue(accountsService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  it('/accounts (POST)', () => {
    return request(app.getHttpServer())
      .post('/accounts')
      .send({
        email: 'john.doe@z.org',
        auth_provider: 'google',
        auth_provider_email: 'john.doe@gmail.com',
        roles: ['user'],
      })
      .expect(201)
      .expect(SAMPLE_ACCOUNT);
  });

  it('/accounts (POST) should validate nested objects', () => {
    return request(app.getHttpServer())
      .post('/accounts')
      .send({
        email: 'john.doe@z.org',
        auth_provider: 'google',
        auth_provider_email: 'john.doe@gmail.com',
        roles: ['user'],
        opt_in: {
          news_offers: true,
          device_info_upload: false,
          analytics: 'never', // <-- this should be a boolean
        },
      })
      .expect(400)
      .expect((res) =>
        expect(res.body.message).toEqual([
          'opt_in.analytics must be a boolean value',
        ]),
      );
  });

  afterAll(async () => {
    await app.close();
  });
});
