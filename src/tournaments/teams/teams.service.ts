import {
  Injectable, NotFoundException, ConflictException, BadRequestException, ForbiddenException,
} from "@nestjs/common";
import { TeamsRepository } from "./teams.repository";
import { CreateTeamDto } from "./dto/CreateTeam.dto";
import { UpdateTeamDto } from "./dto/UpdateTeam.dto";
import { TeamIdDto } from "./dto/TeamId.dto";
import { AddMemberDto } from "./dto/AddMember.dto";
import { ImagesService } from "src/utils/images/images.service";

@Injectable()
export class TeamsService {
  constructor(private readonly teamsRepository: TeamsRepository,
    private readonly imagesService: ImagesService
  ) { }

  async createTeam(createTeamDto: CreateTeamDto,file:Express.Multer.File) {
    const existingTeam = await this.teamsRepository.existingTeamName(createTeamDto.name);
    if (existingTeam) {
      throw new ConflictException("Ya existe un equipo con este nombre");
    }
     const saveImage = await this.imagesService.create(
      createTeamDto._idLeader,
      { type: "tournaments" },
      file
    );
    const newTeam=await this.teamsRepository.createTeam(createTeamDto,saveImage.data._id+"");
    return {statusCode:200,message:"Equipo creado con exito"}
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
  async findManyByIds(_id:string[]){
    const teams= await this.teamsRepository.findManyByIds(_id)
    if(teams.length==0)
      throw new NotFoundException("No se encontro ningun equipo")
    return {statusCode:200,message:"Equipos encontrados con exito", data:teams}
  }
  async deleteTeam({ _id }: TeamIdDto) {
    const deleteResult = await this.teamsRepository.deleteTeam(_id);
    if (deleteResult.matchedCount < 1) {
      throw new NotFoundException("Equipo no encontrado");
    }
    if (deleteResult.modifiedCount < 1) {
      throw new BadRequestException("No se pudo eliminar el equipo");
    }
    return { statusCode: 200, message: "Equipo eliminado con éxito" };
  }

  // Eliminar imagen del equipo
  async deleteTeamImage({ _id }: TeamIdDto) {
    const deleteResult = await this.teamsRepository.deleteTeamImage(_id);
    if (deleteResult.matchedCount < 1) {
      throw new NotFoundException("Equipo no encontrado para eliminar imagen");
    }
    if (deleteResult.modifiedCount < 1) {
      throw new BadRequestException("No se pudo eliminar la imagen del equipo");
    }
    return { statusCode: 200, message: "Imagen del equipo eliminada con éxito" };
  }

  //Busquedas
  async findTeamById({ _id }: TeamIdDto) {
    console.log(_id);
    
    const team = await this.teamsRepository.findTeamById(_id);
    if (!team) {
      throw new NotFoundException("Equipo no encontrado");
    }
    return {
      statusCode: 200,
      message: "Equipo obtenido con éxito",
      data: team
    };
  }

  async findTeamByName(name: string) {
    const team = await this.teamsRepository.findTeamByName(name);
    if (!team) {
      throw new NotFoundException("Equipo no encontrado");
    }
    return {
      statusCode: 200,
      message: "Equipo obtenido con éxito",
      data: team
    };
  }

  async findTeamsByImage(_idImg: string) {
    const team = await this.teamsRepository.findTeamsByImage(_idImg);
    if (!team) {
      throw new NotFoundException("Equipo no encontrado");
    }
    return  {
      statusCode: 200,
      message: "Equipo obtenido con éxito",
      data: team
    };
  }

  // Obtener imagen del equipo
  async getTeamImage({ _id }: TeamIdDto) {
    const existingTeam = await this.teamsRepository.existingTeamId(_id);
    if (!existingTeam) {
      throw new NotFoundException("Equipo no encontrado");
    }

    const imageData = await this.teamsRepository.getTeamImage(_id);
    if (!imageData) {
      throw new NotFoundException("Imagen del equipo no encontrada");
    }

    return {
      statusCode: 200,
      message: "Imagen del equipo obtenida con éxito",
      data: imageData
    };
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
    const teams = await this.teamsRepository.findTeamsByMember(memberId);
    if (teams.length == 0) {
      throw new NotFoundException("No se encontro ningun equipo");
    }
    return {statusCode:200,message:"Equipos encontrados con exito",data:teams}
  }

  async existingTeamName(name: string) {
    return await this.teamsRepository.existingTeamName(name);
  }

  async existingTeamId(_id: string) {
    return await this.teamsRepository.existingTeamId(_id);
  }
  async addMember(addMemberDto: AddMemberDto) {
    const existTeam = await this.existingTeamId(addMemberDto._idTeam)
    if (!existTeam)
      throw new NotFoundException("El equipo no existe")
    const existMember = await this.teamsRepository.existMemberTeam(addMemberDto._idTeam, addMemberDto._idUser)
    if (existMember)
      throw new ForbiddenException("Ya te encuentras en este equipo")
    const updateState = await this.teamsRepository.addMember(addMemberDto._idTeam, addMemberDto._idUser)
    return { statusCode: 200, message: "miembro del equipo agregado con exito" }
  }
  async filterByIds(_id:string[]){
    if(_id.length==0)
      throw new BadRequestException("No se envio ningun equipo")
    const teams= await this.teamsRepository.filterByIds(_id)
    if(teams.length==0)
      throw new NotFoundException("No se encontro ningun equipo")
    return{
      statusCode: 200,
      message: "Equipos obtenidos con éxito",
      data: teams
    };
  }
}