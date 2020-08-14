import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { TecnologiaService } from '../src/tecnologia/tecnologia.service';

describe('TecnologiaController (e2e)', () => {
  let app: INestApplication;
  let tecnologiaService: TecnologiaService;
  const URL_MODELO = '/technologies/';

  beforeAll(async () => {
    process.env.NODE_ENV = 'testing';
    dotenv.config({ path: join(__dirname, '..', 'env', `${process.env.NODE_ENV}.env`) });
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    tecnologiaService = moduleFixture.get<TecnologiaService>(TecnologiaService);
    await app.init();
  });

  it('/technologies (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post(URL_MODELO)
      .send({
        nombre: 'JavaScript',
      })
      .expect(HttpStatus.CREATED);

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toBeGreaterThan(0);
  });

  it('/technologies (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(URL_MODELO)
      .expect(HttpStatus.OK);

    expect(response.body.length).toBeGreaterThanOrEqual(0);
  });
});
