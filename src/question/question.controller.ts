import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }



  @Post(":id")
  async create(@Param("id") testId: number) {
    return await this.questionService.create(testId, 4)
  }

  @Get(":id")
  async getByTestId(@Param("id") testId: number) {
    return await this.questionService.getByTestId(testId)
  }
}
