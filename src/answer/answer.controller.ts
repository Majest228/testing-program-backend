import { Controller, Get, Post, Param } from '@nestjs/common';
import { AnswerService } from './answer.service';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) { }
  @Post()
  async pushQuestions() {
    return await this.answerService.pushQuestions(1)
  }

  @Get(":id")
  async getById(@Param("id") testId: number) {
    return await this.answerService.getById(testId)
  }
}
