import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SportMatchRepository } from './sport_match.repository';
import { CreateManySportMatchDto } from './dto/create_many-sport_match.dto';
import { TeamsService } from '../teams/teams.service';
import { Tournaments } from '../tournaments/tournaments.schema';

@Injectable()
export class SportMatchService {
  constructor(private readonly sportMatchRepository: SportMatchRepository,
    private readonly teamsService: TeamsService,
  ) {}

  async createMany(createSportMatchDto: CreateManySportMatchDto,tournament:Tournaments) {
    const teamsRound=tournament.rounds.length==0?tournament.teams.map((item)=>item._idTeam):
    tournament.rounds[tournament.rounds.length-1].teamsWinners
    const teamsId=createSportMatchDto.matchs.map((item)=>item.teams).flat()
    const existsTeams=teamsId.every((team)=>teamsRound.includes(team))
    if(!existsTeams)
      throw new NotFoundException("Estas creando un encuentro para un equipo que no se encuentra en esta ronda")
    const teamsRes=await this.teamsService.findManyByIds(teamsId)
    const teams=teamsRes.data
    if(teams.length!=teams.length)
      throw new BadRequestException("Hay algunos equipos que no se encontraron")
    const matchData=createSportMatchDto.matchs.map((item)=>({
      _idTournament:createSportMatchDto._idTournament,
      typeSport:createSportMatchDto.typeSport,
      initMatch:item.initMatch,
      teams:item.teams.map((_id)=>({
        _idTeam:_id,
        playersMembers:teams.find(team=>team._id==_id)?.members??[]
      }))
    }))
    const saveMatchs=await this.sportMatchRepository.createMany(matchData)
    return {statusCode:200,message:"encuentros creados con exito",data:saveMatchs}
  }


}
