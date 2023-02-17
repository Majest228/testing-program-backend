
import { Base } from '../utils/base'
import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { TestModel } from 'src/test/test.model'
import { TestResModel } from 'src/test-res/test-res.model'

@Entity('users')
export class UserModel extends Base {

    @Column({ unique: true })
    login: string

    @Column()
    password: string

    @Column({ default: '' })
    name: string

    @Column({ default: '' })
    surname: string

    @Column({ default: 'Worker' })
    role: Role

    @OneToMany(() => TestModel, test => test.user, { onDelete: 'CASCADE' })
    test: TestModel[]

    @OneToMany(() => TestResModel, testRes => testRes.user, { onDelete: 'CASCADE' })
    testRes: TestResModel[]
}


enum Role {
    Worker = "Worker",
    Head = "Head",
    Admin = "Admin"
}