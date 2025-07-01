import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateTournamentDto } from './dto/create-tournaments.dto';
import { InscribeTeamDto } from './dto/inscribe-team.dto';
import { FilterTournamentDto } from './dto/filter-tournament.dto';

@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) { }
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File,
    @Body() createTournamentDto: CreateTournamentDto,) {
    return this.tournamentsService.create(file, createTournamentDto)
  }
  @Post("inscribe")
  inscribeTeam(@Body() inscribeTeamDto: InscribeTeamDto) {
    return this.tournamentsService.inscribe(inscribeTeamDto)
  }
  @Post("filter")
  filter(@Body() filterTournamentDto: FilterTournamentDto) {
    return this.tournamentsService.filter(filterTournamentDto)
  }
}
