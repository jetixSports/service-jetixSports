import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateTournamentDto } from "./dto/create-tournaments.dto";
import { TournamentsRepository } from "./tournaments.repository";
import { ImagesService } from "src/utils/images/images.service";
import { AddPayTeamTournamentDto } from "./dto/add-pay-team-tournament.dto";
import { VerifyPayTeamTournamentDto } from "./dto/verify-pay-team-tournament.dto";

@Injectable()
export class TournamentsService {
  constructor(
    private readonly tournamentsRepository: TournamentsRepository,
    private readonly imagesService: ImagesService
  ) {}
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
}
