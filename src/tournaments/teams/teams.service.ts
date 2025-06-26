import {Injectable, NotFoundException, ConflictException, BadRequestException,
} from "@nestjs/common";
import { TeamsRepository } from "./teams.repository";
import { CreateTeamDto } from "./dto/CreateTeam.dto";
import { UpdateTeamDto } from "./dto/UpdateTeam.dto";
import { TeamIdDto } from "./dto/TeamId.dto";

@Injectable()
export class TeamsService {
  constructor(private readonly teamsRepository: TeamsRepository) {}

  async createTeam(createTeamDto: CreateTeamDto) {
    const existingTeam = await this.teamsRepository.existingTeamName(createTeamDto.name);
    if (existingTeam) {
      throw new ConflictException("Ya existe un equipo con este nombre");
    }
    return await this.teamsRepository.createTeam(createTeamDto);
  }

  // Actualizar equipo
  async updateTeam({ _id }: TeamIdDto, updateTeamDto: UpdateTeamDto) {
    const existingTeam = await this.teamsRepository.existingTeamId(_id);
    if (!existingTeam) {
      throw new NotFoundException("Equipo no encontrado");
    }

    if (updateTeamDto.name) {
      const nameExists = await this.teamsRepository.existingTeamName(updateTeamDto.name, _id);
      if (nameExists) {
        throw new ConflictException("Ya existe un equipo con este nombre");
      }
    }

    const updateResult = await this.teamsRepository.updateTeam(_id, updateTeamDto);
    if (updateResult.matchedCount < 1) {
      throw new NotFoundException("No se pudo encontrar un equipo con el ID proporcionado. Por favor, verifica que el ID sea correcto.");
    }
    if (updateResult.modifiedCount < 1) {
      throw new BadRequestException("No se realizaron cambios en el equipo. Verifica que los datos a actualizar sean distintos de los actuales.");
    }
    return { statusCode: 200, message: "Equipo actualizado con éxito" };
  }

  // Eliminar equipo
  async deleteTeam({ _id }: TeamIdDto) {
    const deleteResult = await this.teamsRepository.deleteTeam(_id);
    if (deleteResult.matchedCount < 1) {
      throw new NotFoundException("Equipo no encontrado");
    }
    return { statusCode: 200, message: "Equipo eliminado con éxito" };
  }

  //Busquedas
  async findTeamById({ _id }: TeamIdDto) {
    const team = await this.teamsRepository.findTeamById(_id);
    if (!team) {
      throw new NotFoundException("Equipo no encontrado");
    }
    return team;
  }

  async findTeamByName(name: string) {
    const team = await this.teamsRepository.findTeamByName(name);
    if (!team) {
      throw new NotFoundException("Equipo no encontrado");
    }
    return team;
  }

  async findAllTeams(filters: any = {}) {
    return await this.teamsRepository.findAllTeams(filters);
  }

  // Buscar miembros de un equipo
  async getTeamMembers({ _id }: TeamIdDto) {
    const existingTeam = await this.teamsRepository.existingTeamId(_id);
    if (!existingTeam) {
      throw new NotFoundException("Equipo no encontrado");
    }

    const members = await this.teamsRepository.getTeamMembers(_id);
    return {
      statusCode: 200,
      message: "Miembros del equipo obtenidos con éxito",
      data: members
    };
  }

  // Obtener cantidad de miembros
  async getTeamMembersCount({ _id }: TeamIdDto) {
    const existingTeam = await this.teamsRepository.existingTeamId(_id);
    if (!existingTeam) {
      throw new NotFoundException("Equipo no encontrado");
    }

    const membersCount = await this.teamsRepository.getTeamMembersCount(_id);
    return {
      statusCode: 200,
      message: "Cantidad de miembros obtenida con éxito",
      data: { count: membersCount }
    };
  }


  async findTeamsByMember(memberId: string) {
    return await this.teamsRepository.findTeamsByMember(memberId);
  }

  async existingTeamName(name: string) {
    return await this.teamsRepository.existingTeamName(name);
  }

  async existingTeamId(_id: string) {
    return await this.teamsRepository.existingTeamId(_id);
  }

}