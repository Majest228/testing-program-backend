import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FilesController } from './files.controller';

@Module({
    controllers: [FilesController],
    imports: [ConfigModule],
})
export class FilesModule { }