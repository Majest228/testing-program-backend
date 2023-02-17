
import { Base } from '../utils/base'
import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { TestModel } from 'src/test/test.model'
import { UserModel } from 'src/user/user.model'

@Entity('test-res')
export class TestResModel extends Base {

    @Column()
    res: number

    @ManyToOne(() => UserModel, user => user.testRes, { onDelete: 'CASCADE' })
    user: UserModel


    @ManyToOne(() => TestModel, test => test.testRes, { onDelete: 'CASCADE' })
    test: TestModel

}


