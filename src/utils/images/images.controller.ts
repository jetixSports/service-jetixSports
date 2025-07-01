import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res, StreamableFile, Header } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express'; 
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File, @Body() createImageDto: CreateImageDto) {
    return this.imagesService.create('', createImageDto, file);
  }

  @Get(':type/:id')
  @Header('Content-Type', 'image/*')
  async getImage(
    @Param('type') type: string,
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response
  ) {
    try {
      const { fileImage,extends:imgExte } = await this.imagesService.getImage(type,id);
       res.set({
      'Content-Type': 'image/'+imgExte, })
      return new StreamableFile(fileImage.createReadStream());
    } catch (error) {
      throw error;
    }
  }
}
