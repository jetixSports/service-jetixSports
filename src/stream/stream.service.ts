import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { StreamRepository } from './stream.repository';
import { TournamentsService } from 'src/tournaments/tournaments/tournaments.service';
import { SportMatchService } from 'src/tournaments/sport_match/sport_match.service';
import { FilterStreamDto } from './dto/filter-stream.dto';
import { CreateStreamTournamentDto } from './dto/create-stream-tournament.dto';
import { CreateStreamMatchDto } from './dto/create-stream-match.dto';
import { TeamsService } from 'src/tournaments/teams/teams.service';
import { UpdateStreamDto } from './dto/update-stream.dto';

@Injectable()
export class StreamService {
  constructor(private readonly streamRepository: StreamRepository,
    private readonly tournamentsService: TournamentsService,
    private readonly sportMatchService: SportMatchService,
    private readonly teamsService: TeamsService
  ) { }

  async createInTour(streamData: CreateStreamTournamentDto) {
    const tournamentRes = await this.tournamentsService.findById(streamData._idTournament)
    const tournament = tournamentRes.data
    if (tournament._idReferee != streamData._idUser)
      throw new ForbiddenException("No eres el organizador de este torneo")
    if (tournament.status != "active")
      throw new BadRequestException("El torneo no se encuentra activo")
    const newStream = await this.streamRepository.saveStream(streamData)
    const saveInTour = await this.tournamentsService.saveStream(streamData._idTournament, newStream.data._id + "")
    return { ...newStream, data: {} };
  }

  async createInMatch(streamData: CreateStreamMatchDto) {
    const team = await this.teamsService.findTeamById({ _id: streamData._idTeam })
    if (team.data._idLeader != streamData._idUser)
      throw new ForbiddenException("No eres el lider de este equipo")
    const matchRes = await this.sportMatchService.findAll({ _id: streamData._idMatch })
    const match = matchRes.data[0]
    if (match.status != "active")
      throw new BadRequestException("El encuentro no se esta activo")
    const indexTeam = match.teams.findIndex((item) => item._idTeam == streamData._idTeam)
    if (indexTeam == -1)
      throw new BadRequestException("Este equipo no esta en este encuentro")
    if (match.teams[indexTeam]._idStream && match.teams[indexTeam]._idStream != '')
      throw new BadRequestException("Este encuentro ya posee un stream")
    const newStream = await this.streamRepository.saveStream(streamData)
    const saveInMatch = await this.sportMatchService.saveStream(streamData._idMatch, streamData._idTeam, newStream.data._id + "")
    return { ...newStream, data: {} };
  }
  async findAll(filterStreamDto: FilterStreamDto) {
    const findStream = await this.streamRepository.findAll(filterStreamDto)
    if (findStream.length == 0)
      throw new NotFoundException("No se encontro ningun stream")
    return { statusCode: 200, message: "Stream encontrado con exito", data: findStream }
  }
  async update(updateStreamDto: UpdateStreamDto) {
    const streamRes=await this.findAll({_id:updateStreamDto._id})
    const stream=streamRes.data[0]
    if(stream._idUser!=updateStreamDto._idUser)
      throw new ForbiddenException("No eres el creador de este Stream")
    const updateState=await this.streamRepository.update(updateStreamDto)
     if (updateState.matchedCount == 0)
      throw new NotFoundException("No se encontro ningun stream");
    if (updateState.modifiedCount == 0)
      throw new NotFoundException("Se encontro el stream, pero no se modifico");
    return {statusCode:200,message:"Se actualizo el stream con exito"}
  }
}
