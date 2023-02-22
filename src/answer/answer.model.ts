import { TestModel } from "src/test/test.model";
import { Base } from "src/utils/base";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity('answer')
export class AnswerModel extends Base {
    @Column()
    question: string

    @Column()
    right: string;

    @ManyToOne(() => TestModel, test => test.answer, { onDelete: 'CASCADE' })
    test: TestModel

}