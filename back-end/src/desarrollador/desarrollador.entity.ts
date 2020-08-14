import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm/index';
import { TecnologiaEntity } from '../tecnologia/tecnologia.entity';

/**
 * Definición de los campos de la entidad desarrollador que se mapearan en la base de datos.
 * @author Darwin Guzmán
 */
@Entity('desarrollador')
export class DesarrolladorEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nombresCompletos: string;

  @Column()
  linkGitHub: string;

  @ManyToMany(type => TecnologiaEntity, { cascade: true, eager: true })
  @JoinTable()
  tecnologiasConocidas?: TecnologiaEntity[];
}
