import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DesarrolladorModule } from './desarrollador/desarrollador.module';
import { TecnologiaModule } from './tecnologia/tecnologia.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
