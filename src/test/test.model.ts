import { TestResModel } from 'src/test-res/test-res.model';
import { UserModel } from 'src/user/user.model';
import { Base } from 'src/utils/base';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('tests')
export class TestModel extends Base {

    @Column()
    name: string;

    @ManyToOne(() => UserModel, user => user.test, { onDelete: 'CASCADE' })
    user: UserModel

    @Column()
    testLink: string

    @OneToMany(() => TestResModel, testRes => testRes.test, { onDelete: 'CASCADE' })
    testRes: TestResModel[]



}