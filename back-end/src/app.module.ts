import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DesarrolladorModule } from './desarrollador/desarrollador.module';
import { TecnologiaModule } from './tecnologia/tecnologia.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'sqlite',
        database: `./${process.env.DATABASE}` || './database.sqlite',
        autoLoadEntities: true,
        synchronize: true,
        dropSchema: false,
        logging: false,
      }),
    }),
    DesarrolladorModule,
    TecnologiaModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
