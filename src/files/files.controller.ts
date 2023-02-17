import { Controller, Get, Post, UseInterceptors, UploadedFile, UploadedFiles, Res, Param, HttpStatus } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from '../utils/file.upload';

@Controller('files')
export class FilesController {
    constructor() { }

    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads/tests',
                filename: editFileName,
            }),
        }),

    )
    async uploadedFile(@UploadedFile() file) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return {
            status: HttpStatus.OK,
            message: 'File uploaded successfully!',
            data: response,
        };
    }

    @Post('uploadMultipleFiles')
    @UseInterceptors(
        FilesInterceptor('file', 10, {
            storage: diskStorage({
                destination: './uploads/tests',
                filename: editFileName,
            }),
        }),
    )
    async uploadMultipleFiles(@UploadedFiles() files) {
        const response = [];
        files.forEach(file => {
            const fileReponse = {
                originalname: file.originalname,
                filename: file.filename,
            };
            response.push(fileReponse);
        });
        return {
            status: HttpStatus.OK,
            message: 'Images uploaded successfully!',
            data: response,
        };
    }
    @Get(':filename')
    getImage(@Param('filename') file, @Res() res) {
        const response = res.sendFile(file, { root: './uploads' });
        return {
            status: HttpStatus.OK,
            data: response,
        };
    }
}
