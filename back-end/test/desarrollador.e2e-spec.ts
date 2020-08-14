import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { DesarrolladorService } from '../src/desarrollador/desarrollador.service';
import { TecnologiaService } from '../src/tecnologia/tecnologia.service';

describe('DesarrolladorController (e2e)', () => {
  let app: INestApplication;
  let desarrolladorService: DesarrolladorService;
  let tecnologiaService: TecnologiaService;
  const URL_MODELO = '/developers/';

  beforeAll(async () => {
    process.env.NODE_ENV = 'testing';
    dotenv.config({ path: join(__dirname, '..', 'env', `${process.env.NODE_ENV}.env`) });
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    desarrolladorService = moduleFixture.get<DesarrolladorService>(DesarrolladorService);
    tecnologiaService = moduleFixture.get<TecnologiaService>(TecnologiaService);
    await tecnologiaService.insertar({ nombre: 'JavaScript' });
    await tecnologiaService.insertar({ nombre: 'TypeScript' });
    await app.init();
  });

  it('/developers (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post(URL_MODELO)
      .send({
        nombresCompletos: 'Darwin Guzmán',
        linkGitHub: 'https://github.com/darwinguz',
        idsTecnologiasConocidas: [1],
      })
      .expect(HttpStatus.CREATED);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toBeGreaterThan(0);
    expect(response.body.tecnologiasConocidas.length).toBe(1);
  });

  it('/developers (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(URL_MODELO)
      .expect(HttpStatus.OK);

    expect(response.body.length).toBeGreaterThanOrEqual(0);
  });

  it('/developers/:id (GET)', async () => {
    const idsTecnologiasConocidas = [1];
    const desarrolladorEntity = await desarrolladorService.insertar({
      nombresCompletos: 'Darwin Guzmán',
      linkGitHub: 'https://github.com/darwinguz',
      idsTecnologiasConocidas,
    });

    const response = await request(app.getHttpServer())
      .get(URL_MODELO + desarrolladorEntity.id)
      .expect(HttpStatus.OK);
    expect(response.body).toEqual(desarrolladorEntity);
  });

  it('/developers (PUT)', async () => {
    const idsTecnologiasConocidas = [1];
    const desarrolladorEntity = await desarrolladorService.insertar({
      nombresCompletos: 'Darwin Guzmán',
      linkGitHub: 'https://github.com/darwinguz',
      idsTecnologiasConocidas,
    });
    desarrolladorEntity.linkGitHub = 'https://github.com/darwinguz-actualizado';
    const response = await request(app.getHttpServer())
      .put(URL_MODELO + desarrolladorEntity.id)
      .send({
        nombresCompletos: desarrolladorEntity.nombresCompletos,
        linkGitHub: desarrolladorEntity.linkGitHub,
        idsTecnologiasConocidas,
      })
      .expect(HttpStatus.OK);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toEqual(desarrolladorEntity);
  });

  it('/developers/:id (DELETE)', async () => {
    const idsTecnologiasConocidas = [1];
    const desarrolladorEntity = await desarrolladorService.insertar({
      nombresCompletos: 'Darwin Guzmán',
      linkGitHub: 'https://github.com/darwinguz',
      idsTecnologiasConocidas,
    });
    return request(app.getHttpServer())
      .delete(URL_MODELO + desarrolladorEntity.id)
      .expect(HttpStatus.NO_CONTENT)
      .expect('');
  });
});
