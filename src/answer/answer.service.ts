import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { TestModel } from 'src/test/test.model';
import { Repository } from 'typeorm';
import { AnswerModel } from './answer.model';

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(AnswerModel)
        private readonly answerModel: Repository<AnswerModel>,
        @InjectRepository(TestModel)
        private readonly testModel: Repository<TestModel>,
    ) { }

    async pushQuestions(testId: number) {
        const currentTest = await this.testModel.findOneBy({ id: testId })

        const text = readFileSync(`./uploads/tests/${currentTest.testLink}`, 'utf8').replace(/\r/g, "").split("\n")

        const questions = [];
        for (let i = 0; i < text.length; i++) {
            if ((i + 1) % 4 == 0) {
                questions.push([text[i - 3], text[i - 2]])
            }
        }
        questions.forEach((question, i) => {
            const newValue = this.answerModel.create({
                question: question[0],
                right: question[1],
                test: { id: testId }
            })

            return this.answerModel.save(newValue)
        })
    }


    async getById(testId: number) {
        return await this.answerModel.findBy({ test: { id: testId } })
    }
}
