import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { ImagesRepository } from './images.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Images, ImagesSchema } from './images.schema';

@Module({
  imports:[
    MongooseModule.forFeature(
          [{ name: Images.name, schema: ImagesSchema }],
          process.env.UTILS_DB
        ),
  ],
  controllers: [ImagesController],
  providers: [ImagesService,ImagesRepository],
  exports:[ImagesService]
})
export class ImagesModule {}
