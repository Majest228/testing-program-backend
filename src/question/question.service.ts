import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { TestModel } from 'src/test/test.model';
import { Repository } from 'typeorm';
import { QuestionModel } from './question.model';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(QuestionModel)
        private readonly questionModel: Repository<QuestionModel>,
        @InjectRepository(TestModel)
        private readonly testModel: Repository<TestModel>,
    ) { }

    async create(testId: number, count: number) {
        const currentTest = await this.testModel.findOneBy({ id: testId })
        const text = readFileSync(`./uploads/tests/${currentTest.testLink}`, 'utf8').replace(/\r/g, "").split("\n")
        const questions = [];
        for (let i = 0; i < text.length; i++) {
            if ((i + 1) % (count) == 0) {

                let variants = []
                for (let j = 2; j < count + 1; j++) {
                    variants.push(text[i - (count - j)])
                    console.log("variant", variants)
                }
                questions.push([text[i - (count - 1)], variants])
            }
            console.log("ques", questions)
        }
        questions.forEach((question, i) => {
            let currentQuestion = question[0]
            question[1].forEach(item => {
                const newValue = this.questionModel.create({
                    question: currentQuestion,
                    questionId: i + 1,
                    variant: item,
                    count: count,
                    testId
                })
                return this.questionModel.save(newValue)
            })
        })
    }

    async getByTestId(testId: number) {
        return await this.questionModel.findBy({ testId })
    }

}
