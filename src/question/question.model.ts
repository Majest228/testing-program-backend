import { TestModel } from 'src/test/test.model';
import { Base } from 'src/utils/base';
import { Column, Entity, ManyToOne, Tree, TreeChildren, TreeParent } from "typeorm";

@Entity('question')

export class QuestionModel extends Base {
    @Column()
    question: string

    @Column()
    count: number

    @Column()
    questionId: number

    @Column()
    variant: string

    @Column()
    testId: number

    @Column()
    isRight: boolean
}