import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestDto } from './dto/test.dto';
import { TestModel } from './test.model';
import { readFileSync, writeFileSync } from 'fs'
import { extractRawText } from 'mammoth';
import { basename, join } from 'path'

@Injectable()
export class TestService {
    constructor(
        @InjectRepository(TestModel)
        private readonly testModel: Repository<TestModel>,
    ) { }

    async create(ownerId: number, dto: TestDto) {
        const newTest = await this.testModel.create({
            name: dto.name,
            testLink: dto.testLink,
            user: { id: ownerId }
        })

        const test = await this.testModel.save(newTest)
        return test

    }
    async getById(id: number) {
        return await this.testModel.findOneBy({ id })
    }
    async getAll() {
        return await this.testModel.find()
    }

    async parseFile(id: number) {
        const currentTest = await this.testModel.findOneBy({ id })

        const text = readFileSync(`./uploads/tests/${currentTest.testLink}`, 'utf8')

        return text

    }
    //@ts-ignore
    async parseFileDocx(id: number) {
        const currentTest = await this.testModel.findOneBy({ id })
        const filePath = join(`./uploads/tests/${currentTest.testLink}`)


        const text = extractRawText({ path: filePath }).then((res) => {
            let text = res.value

            let textLines = text.split("\n");
            for (let i = 0; i < textLines.length; i++) {
                // console.log(textLines[i]);

            }
            writeFileSync(`./uploads/tests/${currentTest.testLink}.txt`, text.replace(/\n\n/g, '\n'))
            const fileTest = readFileSync(`./uploads/tests/${currentTest.testLink}.txt`, 'utf8')
            return fileTest
        })
        return text

        // const response = await superagent.get(`http://localhost:8080/api/files/test1.docx`)
        //     .buffer();
        // const buffer = response.body;
        // const text = (await mammoth.extractRawText({ buffer })).value;

        // return text
        // const text = readFileSync(`./uploads/tests/${currentTest.testLink}`, 'utf8')
        // await mammoth.extractRawText({ path: `http://localhost:8080/api/files/${currentTest.testLink}` }).then(res => {
        // })

        // return text
        // const updateText = mammoth.extractRawText({ path: `./uploads/tests/${currentTest.testLink}` })
    }
}
