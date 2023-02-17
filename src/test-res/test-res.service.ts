import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestResDto } from './dto/test-res.dto';
import { TestResModel } from './test-res.model';

@Injectable()
export class TestResService {
    constructor(
        @InjectRepository(TestResModel)
        private readonly testResModel: Repository<TestResModel>,
    ) { }


    async create(userId: number, dto: TestResDto) {
        const newTestRes = await this.testResModel.create({
            res: dto.res,
            user: { id: userId },
            test: { id: dto.testId }
        })

        return await this.testResModel.save(newTestRes)
    }
}
