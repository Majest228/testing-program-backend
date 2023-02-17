import { Base } from 'src/utils/base';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('files')
export class Files extends Base {

    @Column()
    name: string;


}