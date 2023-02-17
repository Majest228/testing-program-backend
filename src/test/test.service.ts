import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestDto } from './dto/test.dto';
import { TestModel } from './test.model';

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

    }

    async getAll() {
        return await this.testModel.find()
    }
}
