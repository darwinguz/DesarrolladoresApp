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

  @Column({ name: 'nombres_completos' })
  nombresCompletos: string;

  @Column({ name: 'link_git_hub' })
  linkGitHub: string;

  @ManyToMany(() => TecnologiaEntity, { cascade: true, eager: true })
  @JoinTable()
  @JoinTable({
    name: 'desarrollador_tecnologia',
    joinColumn: {
      name: 'id_desarrollador',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_tecnologia',
      referencedColumnName: 'id',
    },
  })
  tecnologiasConocidas?: TecnologiaEntity[];
}
