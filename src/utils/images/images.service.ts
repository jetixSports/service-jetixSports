import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImagesRepository } from './images.repository';
import { diskStorage } from 'multer';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ImagesService {
  constructor(private readonly imagesRepository: ImagesRepository) { }

  async create(_idUser: string, createImageDto: CreateImageDto, file: Express.Multer.File) {
    try {
      const isValid = this.imagesRepository.validateImage(file);
      if (isValid.statusCode !== 200)
        throw new BadRequestException(isValid.message)

      const saveImage = await this.imagesRepository.saveImage(_idUser, createImageDto.type)
    
      await this.imagesRepository.saveFile({
        fileName:saveImage.data?._id+'',
        file,
        imgPath:createImageDto.type
      })
      return saveImage
    } catch (error) {
      throw new Error(`Error al guardar la imagen: ${error.message}`);
    }
  }

  async getImage(type:string,id:string){
    const imgExist=await this.imagesRepository.existImage({type,_id:id})
    if(!imgExist)
      throw new NotFoundException('Imagen no encontrada')
    const fileImage=await this.imagesRepository.getImage(type,id)
    if(!fileImage)
      throw new NotFoundException('Imagen no encontrada')
    return fileImage
  }
}
