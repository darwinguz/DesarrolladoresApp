import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm/index';

/**
 * Definición de los campos de la entidad tecnologia que se mapearan en la base de datos.
 * @author Darwin Guzmán
 */
@Entity('tecnologia')
export class TecnologiaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
}
