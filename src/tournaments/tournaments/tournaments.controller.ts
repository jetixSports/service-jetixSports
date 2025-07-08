import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateTournamentDto } from './dto/create-tournaments.dto';
import { InscribeTeamDto } from './dto/inscribe-team.dto';
import { FilterTournamentDto } from './dto/filter-tournament.dto';
import { CreateManySportMatchDto } from '../sport_match/dto/create_many-sport_match.dto';
import { FinishedMatchDto } from './dto/finishedMatch.dto';
import { FinishedRoundDto } from './dto/finishedRound.dto';

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
  @Post("createRound")
  createRound(@Body() createManySportMatchDto: CreateManySportMatchDto){
    return this.tournamentsService.createRound(createManySportMatchDto)
  }
  @Post("finishedMatch")
  finishedMatch(@Body() finishedMatchDto: FinishedMatchDto){
    return this.tournamentsService.finishedMatch(finishedMatchDto)
  }
  @Post("finishedRound")
  finishedRound(@Body() finishedRoundDto: FinishedRoundDto){
    return this.tournamentsService.finishedRound(finishedRoundDto)
  }
}
