import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateTournamentDto } from './dto/create-tournaments.dto';

@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}
  @Post()
    @UseInterceptors(FileInterceptor('file'))
    create( @UploadedFile() file: Express.Multer.File,
      @Body() createTournamentDto: CreateTournamentDto,){
        return this.tournamentsService.create(file,createTournamentDto)
    }
}
