import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateTournamentDto } from "./dto/create-tournaments.dto";
import { TournamentsRepository } from "./tournaments.repository";
import { ImagesService } from "src/utils/images/images.service";
import { AddPayTeamTournamentDto } from "./dto/add-pay-team-tournament.dto";
import { VerifyPayTeamTournamentDto } from "./dto/verify-pay-team-tournament.dto";
import { InscribeTeamDto } from "./dto/inscribe-team.dto";
import { TeamsService } from "../teams/teams.service";
import { FilterTournamentDto } from "./dto/filter-tournament.dto";
import { CreateManySportMatchDto } from "../sport_match/dto/create_many-sport_match.dto";
import { SportMatchService } from "../sport_match/sport_match.service";
import { FinishedMatchDto } from "./dto/finishedMatch.dto";
import { FinishedRoundDto } from "./dto/finishedRound.dto";

@Injectable()
export class TournamentsService {
  constructor(
    private readonly tournamentsRepository: TournamentsRepository,
    private readonly imagesService: ImagesService,
    private readonly teamsService: TeamsService,
    private readonly sportMatchService: SportMatchService,
  ) { }
  async create(
    file: Express.Multer.File,
    createTournamentDto: CreateTournamentDto
  ) {
    const saveImage = await this.imagesService.create(
      createTournamentDto._idReferee,
      { type: "tournaments" },
      file
    );
    const savedTournament = await this.tournamentsRepository.create({
      ...createTournamentDto,
      _idImg: saveImage.data._id + "",
    });
    return savedTournament;
  }
  async findById(id: string) {
    const tournament = await this.tournamentsRepository.findById(id);
    if (!tournament) throw new NotFoundException("Torneo no encontrado");
    return {
      statusCode: 200,
      message: "Torneo encontrado con exito",
      data: tournament,
    };
  }
  async addPayTeam(addPayTeamTournamentDto: AddPayTeamTournamentDto) {
    const updateState = await this.tournamentsRepository.addPayTeam(
      addPayTeamTournamentDto
    );
    if (updateState.matchedCount == 0)
      throw new NotFoundException("No se encontro un torneo con este team");
    if (updateState.modifiedCount == 0)
      throw new NotFoundException("Se encontro el torneo, pero no se modifico");
    return { statusCode: 200, message: "Pago de equipo registrado con exito" };
  }
  async verifyPayTeam(
    VerifyPayTeamTournamentDto: VerifyPayTeamTournamentDto
  ): Promise<{ statusCode: number; message: string }> {
    const verifyState = await this.tournamentsRepository.verifyPayTeam(
      VerifyPayTeamTournamentDto
    );
    if (verifyState.matchedCount == 0)
      throw new NotFoundException(
        "Pago dentro del equipo del torneo no encontrado"
      );
    if (verifyState.modifiedCount == 0)
      throw new ForbiddenException("Pago no modificado");
    await this.tournamentsRepository.addPay(VerifyPayTeamTournamentDto._idPayment, VerifyPayTeamTournamentDto._idTournament)
    const team = await this.teamsService.findTeamById({ _id: VerifyPayTeamTournamentDto._idTeam + '' })
    await this.tournamentsRepository.addUsersTeam(VerifyPayTeamTournamentDto._idTournament, team.members)
    return {
      statusCode: 200,
      message: "Pago del equipo dentro del torneo veificado con exito",
    };
  }
  async deniedPayTeam(
    VerifyPayTeamTournamentDto: VerifyPayTeamTournamentDto
  ): Promise<{ statusCode: number; message: string }> {
    const verifyState = await this.tournamentsRepository.deniedPayTeam(
      VerifyPayTeamTournamentDto
    );
    if (verifyState.matchedCount == 0)
      throw new NotFoundException(
        "Pago dentro del equipo del torneo no encontrado"
      );
    if (verifyState.modifiedCount == 0)
      throw new ForbiddenException("Pago no modificado");
    return {
      statusCode: 200,
      message: "Pago del equipo dentro del torneo veificado con exito",
    };
  }

  async inscribe(inscribeTeamDto: InscribeTeamDto) {
    const team = await this.teamsService.findTeamById({ _id: inscribeTeamDto._idTeam })
    const tournament = await this.tournamentsRepository.findById(inscribeTeamDto._idTournament)
    if (!tournament)
      throw new NotFoundException("Torneo no encontrado")
    if (team._idLeader !== inscribeTeamDto._idUser)
      throw new ForbiddenException("No eres el lider de este equipo")
    const existTeam = tournament.teams.find((team) => team._idTeam == inscribeTeamDto._idTeam)
    if (existTeam)
      throw new ForbiddenException("Este equipo ya ese encuentra inscrito en este torneo")
    const membersInTeam = inscribeTeamDto.playersMembers.every(member => team.members.includes(member))
    if (!membersInTeam)
      throw new BadRequestException("Estas incluyendo usuarios que no son de tu equipo")
    if (tournament.teamSpace != inscribeTeamDto.playersMembers.length)
      throw new BadRequestException('No se cumple con el tamano establecido de un equipo en este torneo')
    const coute = await this.tournamentsRepository.countTeamsTournament(inscribeTeamDto._idTournament)
    if (coute >= tournament.quotas)
      throw new BadRequestException("No hay espacio en este torneo")
    const updateState = await this.tournamentsRepository.addTeam(inscribeTeamDto._idTournament, { _idLeader: team._idLeader, _idTeam: inscribeTeamDto._idTeam, playersMembers: inscribeTeamDto.playersMembers })
    return { statusCode: 200, message: "Inscripcion al torneo con exito" }
  }

  async filter(filterTournamentDto: FilterTournamentDto) {
    const findTournament = await this.tournamentsRepository.filter(filterTournamentDto)
    if (findTournament.length == 0)
      throw new NotFoundException("Torneos no encontrados")
    return { statusCode: 200, message: 'Torneo encontrado con exito', data: findTournament }
  }

  async createRound(createManySportMatchDto: CreateManySportMatchDto) {
    const { teamsPass, ...data } = createManySportMatchDto
    const tournamentRes = await this.findById(data._idTournament)
    const tournament = tournamentRes.data
    let lastRound = tournament.rounds.reduce((acc, item) => (!acc.nRound || item.nRound > acc.nRound) ? item : acc, {} as any)
    lastRound = Object.keys(lastRound).length == 0 ? null : lastRound
    if (lastRound && lastRound.status != "finished")
      throw new ForbiddenException("La ronda anterior no ha terminado")
    const teams = data.matchs.map(item => item.teams).flat()
    const existsTeams = !teamsPass || teamsPass.length == 0 ? false : teamsPass?.some((team) => teams.includes(team))
    if (existsTeams)
      throw new BadRequestException("Estas pasando a un usuario y emparejandolo al mismo tiempo")
    const teamsRound = lastRound ? lastRound.teamsWinners : tournament.teams.map((item) => item._idTeam)
    const teamsPassExist = teamsPass?.every((team) => teamsRound.includes(team))
    if (!teamsPassExist)
      throw new NotFoundException("El usuario que estas pasando no se encuentra en esta ronda")
    const matchSports = await this.sportMatchService.createMany(data, tournament)
    const matchsId = matchSports.data.map(item => item._id + '')
    const saveRound = await this.tournamentsRepository.createRound(tournament._id + '', {
      _idMatchs: matchsId,
      nRound: lastRound ? lastRound.nRound + 1 : 1,
      teamsMatchs: teams,
      teamsWinners: teamsPass ? teamsPass : []
    })
    if (saveRound.modifiedCount == 0)
      throw new ForbiddenException("Ronda no agregada");
    return {
      statusCode: 200,
      message: "Ronda agregada con exito",
    };
  }
  async finishedMatch(finishedMatchDto: FinishedMatchDto) {
    const existMatch = await this.sportMatchService.existMatch(finishedMatchDto._idMatch)
    if (!existMatch)
      throw new NotFoundException("Encuentro no encontrado")
    const existInTour = await this.tournamentsRepository.existMatchTour(finishedMatchDto._idTournament, finishedMatchDto._idMatch)
    if (!existInTour)
      throw new NotFoundException("Este encuentro no se encuentra en este torneo")
    const tournament = await this.tournamentsRepository.findById(finishedMatchDto._idTournament)
    if (tournament?._idReferee !== finishedMatchDto._idUser)
      throw new ForbiddenException("No eres el organizador de este torneo")
    let lastRound = tournament.rounds.reduce((acc, item) => (!acc.nRound || item.nRound > acc.nRound) ? item : acc, {} as any)
    lastRound = Object.keys(lastRound).length == 0 ? null : lastRound
    if (!lastRound || lastRound.status == "finished")
      throw new ForbiddenException("La ronda anterior no ha terminado")
    const updateMatchState = await this.sportMatchService.updateMatch(finishedMatchDto)
    if (updateMatchState.statusCode !== 200)
      throw new BadRequestException(updateMatchState.message)
    await this.tournamentsRepository.addTeamWinner(finishedMatchDto._idTournament, lastRound.nRound, finishedMatchDto._idTeamWinner)
    return updateMatchState
  }
  async finishedRound(finishedRoundDto: FinishedRoundDto) {
    const tournamentRes = await this.findById(finishedRoundDto._idTournament)
    const tournament = tournamentRes.data
    if (tournament._idReferee != finishedRoundDto._idUser)
      throw new ForbiddenException("No eres el organizador de este Torneo")
    let lastRound = tournament.rounds.reduce((acc, item) => (!acc.nRound || item.nRound > acc.nRound) ? item : acc, {} as any)
    lastRound = Object.keys(lastRound).length == 0 ? null : lastRound
    if (lastRound.status == "finished")
      throw new BadRequestException("La ultima ronda de este torneo ya se encuentra cerrada")
    const countFinishedMatch = await this.sportMatchService.countFinishedMatch(lastRound._idMatchs)
    if (lastRound._idMatchs.length > countFinishedMatch)
      throw new BadRequestException("No han terminado todos los encuentros de esta ronda")
    const updateState = await this.tournamentsRepository.finishedRound(finishedRoundDto._idTournament, lastRound.nRound)
    if (updateState.matchedCount == 0)
      throw new NotFoundException(
        "Torneo no encontrado"
      );
    if (updateState.modifiedCount == 0)
      throw new ForbiddenException("Ronda no modificada");
    return {
      statusCode: 200,
      message: "Ronda terminada con exito exito",
    };
  }
  async saveStream(_id: string, _idStream: string) {
    const updateState = await this.tournamentsRepository.saveStream(_id, _idStream)
    if (updateState.matchedCount == 0)
      throw new NotFoundException("No se encontro ningun torneo");
    if (updateState.modifiedCount == 0)
      throw new NotFoundException("Se encontro el torneo, pero no se modifico");
    return {statusCode:200,message:"Se actualizo el stream con exito en el torneo"}
  }
}
