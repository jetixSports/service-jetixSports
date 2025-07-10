import {Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus, UploadedFile, UseInterceptors} from "@nestjs/common";
import { TeamsService } from "./teams.service";
import { CreateTeamDto } from "./dto/CreateTeam.dto";
import { UpdateTeamDto } from "./dto/UpdateTeam.dto";
import { UpdateTeamImageDto } from "./dto/UpdateTeamImage.dto";
import { TeamIdDto } from "./dto/TeamId.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("teams")
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createTeam(
   @UploadedFile() file: Express.Multer.File,
    @Body() createTeamDto: CreateTeamDto) {
    return await this.teamsService.createTeam(createTeamDto,file);
  }

   // Actualizar equipo
  @Put(":_id")
  async updateTeam(
    @Param() params: TeamIdDto,
    @Body() updateTeamDto: UpdateTeamDto
  ) {
    return await this.teamsService.updateTeam(params, updateTeamDto);
  }

  @Delete(":_id")
  async deleteTeam(@Param() params: TeamIdDto) {
    return await this.teamsService.deleteTeam(params);
  }

  // Actualizar solo la imagen del equipo
  @Put(":_id/image")
  async updateTeamImage(
    @Param() params: TeamIdDto,
    @Body() updateTeamImageDto: UpdateTeamImageDto
  ) {
    return await this.teamsService.updateTeamImage(params, updateTeamImageDto);
  }

  // Eliminar imagen del equipo
  @Delete(":_id/image")
  async deleteTeamImage(@Param() params: TeamIdDto) {
    return await this.teamsService.deleteTeamImage(params);
  }

  @Get("name/:name")
  async findTeamByName(@Param("name") name: string) {
    return await this.teamsService.findTeamByName(name);
  }

  @Post("filterByIds")
  async filterByIds(@Body() {_id}: {_id:string[]}) {
    return await this.teamsService.filterByIds(_id);
  }

  @Get()
  async findAllTeams(@Query() filters: any) {
    return await this.teamsService.findAllTeams(filters);
  }

  @Get(":_id")
  async findTeamById(@Param() params: TeamIdDto) {
    return await this.teamsService.findTeamById(params);
  }

  // Obtener imagen del equipo
  @Get(":_id/image")
  async getTeamImage(@Param() params: TeamIdDto) {
    return await this.teamsService.getTeamImage(params);
  }

  // Buscar equipos por imagen
  @Get("image/:_idImg")
  async findTeamsByImage(@Param("_idImg") _idImg: string) {
    return await this.teamsService.findTeamsByImage(_idImg);
  }

  // Buscar miembros de un equipo
  @Get(":_id/members")
  async getTeamMembers(@Param() params: TeamIdDto) {
    return await this.teamsService.getTeamMembers(params);
  }

  // Obtener cantidad de miembros
  @Get(":_id/members/count")
  async getTeamMembersCount(@Param() params: TeamIdDto) {
    return await this.teamsService.getTeamMembersCount(params);
  }

  @Get("member/:memberId")
  async findTeamsByMember(@Param("memberId") memberId: string) {
    return await this.teamsService.findTeamsByMember(memberId);
  }

}