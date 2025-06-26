import {Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus} from "@nestjs/common";
import { TeamsService } from "./teams.service";
import { CreateTeamDto } from "./dto/CreateTeam.dto";
import { UpdateTeamDto } from "./dto/UpdateTeam.dto";
import { TeamIdDto } from "./dto/TeamId.dto";

@Controller("teams")
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTeam(@Body() createTeamDto: CreateTeamDto) {
    return await this.teamsService.createTeam(createTeamDto);
  }

   // Actualizar equipo (Nombre e Imagen)
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

  @Get("name/:name")
  async findTeamByName(@Param("name") name: string) {
    return await this.teamsService.findTeamByName(name);
  }

  @Get()
  async findAllTeams(@Query() filters: any) {
    return await this.teamsService.findAllTeams(filters);
  }

  @Get(":_id")
  async findTeamById(@Param() params: TeamIdDto) {
    return await this.teamsService.findTeamById(params);
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