import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }



  @Post(":id")
  @Auth('admin')
  async create(@Param("id") testId: number) {
    return await this.questionService.create(testId, 4)
  }

  @Get(":id")
  async getByTestId(@Param("id") testId: number) {
    return await this.questionService.getByTestId(testId)
  }

  @Get("title/:id")
  async getQuestion(@Param("id") testId: number) {
    return await this.questionService.getQuestion(testId)
  }

  @Get("without/:id")
  async getWithoutIsRight(@Param("id") testId: number) {
    return await this.questionService.getWithoutIsRight(testId)
  }
}
