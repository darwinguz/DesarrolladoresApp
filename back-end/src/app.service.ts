import { Injectable, OnModuleInit } from '@nestjs/common';
import { TecnologiaService } from './tecnologia/tecnologia.service';

@Injectable()
export class AppService implements OnModuleInit {
  TECNOLOGIAS_DEFAULT = [
    {
      nombre: 'JavaScript',
    },
    {
      nombre: 'TypeScript',
    },
    {
      nombre: 'Java',
    },
    {
      nombre: 'Kotlin',
    },
    {
      nombre: 'Node.js',
    },
    {
      nombre: 'Spring',
    },
    {
      nombre: 'NestJS',
    },
    {
      nombre: 'Express',
    },
    {
      nombre: 'Angular',
    },
    {
      nombre: 'Vue.js',
    },
    {
      nombre: 'React.js',
    },
    {
      nombre: 'PostgreSQL',
    },
    {
      nombre: 'OracleDB',
    },
    {
      nombre: 'SQLite',
    },
    {
      nombre: 'SQL Server',
    },
    {
      nombre: 'MongoDB',
    },
  ];

  constructor(private readonly tecnologiaService: TecnologiaService) {
  }

  /**
   * Se ejecuta una vez el módulo principal se haya desplegado y verifica si hay
   * registros de tecnologías en la base de datos, si no hay ninguno entonces inserta
   * tecnologías por defecto definidas en TECNOLOGIAS_DEFAULT.
   */
  async onModuleInit(): Promise<void> {
    const tecnologiasEntities = await this.tecnologiaService.seleccionarTodos();
    if (tecnologiasEntities.length === 0) {
      for (const tecnologiaEntity of this.TECNOLOGIAS_DEFAULT) {
        await this.tecnologiaService.insertar(tecnologiaEntity);
      }
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
