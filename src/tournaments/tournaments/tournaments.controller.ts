import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateTournamentDto } from './dto/create-tournaments.dto';
import { InscribeTeamDto } from './dto/inscribe-team.dto';
import { FilterTournamentDto } from './dto/filter-tournament.dto';
import { CreateManySportMatchDto } from '../sport_match/dto/create_many-sport_match.dto';
import { FinishedMatchDto } from './dto/finishedMatch.dto';
import { FinishedRoundDto } from './dto/finishedRound.dto';
import { Permissions } from 'src/decorators/permissions/permissions.decorator';
import { Auth } from 'src/decorators/auth/auth.decorator';

@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) { }
  @Permissions(["Tournaments"],'CREATE')
  @Auth('Auth')
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File,
    @Body() createTournamentDto: CreateTournamentDto,) {
    return this.tournamentsService.create(file, createTournamentDto)
  }
  @Auth('Auth')
  @Post("inscribe")
  inscribeTeam(@Body() inscribeTeamDto: InscribeTeamDto) {
    return this.tournamentsService.inscribe(inscribeTeamDto)
  }
  @Post("filter")
  filter(@Body() filterTournamentDto: FilterTournamentDto) {
    return this.tournamentsService.filter(filterTournamentDto)
  }
  
  @Auth('Auth')
  @Post("createRound")
  createRound(@Body() createManySportMatchDto: CreateManySportMatchDto){
    return this.tournamentsService.createRound(createManySportMatchDto)
  }
  @Auth('Auth')
  @Post("finishedMatch")
  finishedMatch(@Body() finishedMatchDto: FinishedMatchDto){
    return this.tournamentsService.finishedMatch(finishedMatchDto)
  }
  @Auth('Auth')
  @Post("finishedRound")
  finishedRound(@Body() finishedRoundDto: FinishedRoundDto){
    return this.tournamentsService.finishedRound(finishedRoundDto)
  }
}
