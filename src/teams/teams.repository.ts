import { Injectable } from "@nestjs/common";
import { Teams } from "./teams.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateTeamDto } from "./dto/CreateTeam.dto";
import { UpdateTeamDto } from "./dto/UpdateTeam.dto";

@Injectable()
export class TeamsRepository {
  constructor(
    @InjectModel(Teams.name, process.env.TEAMS_COLLECTION)
    private teamsModel: Model<Teams>
  ) {}

  async createTeam(createTeamDto: CreateTeamDto) {
    const newTeam = new this.teamsModel(createTeamDto);
    const team = await newTeam.save();
    return {
      statusCode: 201,
      message: "Equipo creado con éxito",
      data: team,
    };
  }

  async findTeamById(_id: string) {
    const team = await this.teamsModel.findById(_id);
    return team;
  }

  async findTeamByName(name: string) {
    const team = await this.teamsModel.findOne({ name });
    return team;
  }

  async findAllTeams(filters: any = {}) {
    const teams = await this.teamsModel.find(filters);
    return teams;
  }

  async updateTeam(_id: string, updateTeamDto: UpdateTeamDto) {
    return await this.teamsModel.updateOne({ _id }, { $set: updateTeamDto });
  }

  async deleteTeam(_id: string) {
    return await this.teamsModel.updateOne({ _id },{$set:{status:"delete"}});
  }

  async existingTeamName(name: string, excludeId?: string) {
    const query = excludeId ? { name, _id: { $ne: excludeId } } : { name };
    const countTeams = await this.teamsModel.countDocuments(query);
    return countTeams > 0;
  }

  async existingTeamId(_id: string) {
    const countTeams = await this.teamsModel.countDocuments({ _id });
    return countTeams > 0;
  }

  async findTeamsByMember(memberId: string) {
    return await this.teamsModel.find({ members: memberId });
  }

  async getTeamMembersCount(_id: string) {
    const team = await this.teamsModel.findById(_id, { members: 1 });
    return team ? team.members.length : 0;
  }

  async getTeamMembers(_id: string) {
    const team = await this.teamsModel.findById(_id, { members: 1 });
    return team ? team.members : [];
  }
}