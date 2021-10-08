import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect('up-and-running\n');
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
      .expect('This action adds a new account');
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
});
