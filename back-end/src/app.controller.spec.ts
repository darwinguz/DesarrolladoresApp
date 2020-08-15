import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TecnologiaService } from './tecnologia/tecnologia.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TecnologiaEntity } from './tecnologia/tecnologia.entity';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        TecnologiaService,
        {
          provide: getRepositoryToken(TecnologiaEntity),
          useValue: null,
        },
      ],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
