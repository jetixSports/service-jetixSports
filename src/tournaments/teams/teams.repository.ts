import { Injectable } from "@nestjs/common";
import { Teams } from "./teams.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateTeamDto } from "./dto/CreateTeam.dto";
import { UpdateTeamImageDto } from "./dto/UpdateTeamImage.dto";
import { UpdateTeamDto } from "./dto/UpdateTeam.dto";

@Injectable()
export class TeamsRepository {
  constructor(
    @InjectModel(Teams.name, process.env.TOURNAMENTS_DB)
    private teamsModel: Model<Teams>
  ) {}

  async createTeam(createTeamDto: CreateTeamDto) {
    const data={...createTeamDto}
    const leaderIsMember=createTeamDto.members?.includes(createTeamDto._idLeader)??false
    if(!leaderIsMember){
      if(!Array.isArray(data.members))
        data.members=[]
      data.members?.push(data._idLeader)
    }
    const newTeam = new this.teamsModel(data);
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
    const team = await this.teamsModel.findOne({ name,status:{$ne:"delete"} });
    return team;
  }

  async findAllTeams(filters: any = {}) {
    const teams = await this.teamsModel.find({status:{$ne:"delete"},...filters});
    return teams;
  }

  async updateTeam(_id: string, updateTeamDto: UpdateTeamDto) {
    return await this.teamsModel.updateOne({ _id, status:{$ne:"delete"} }, { $set: updateTeamDto });
  }

  async updateTeamImage(_id: string, updateTeamImageDto: UpdateTeamImageDto) {
    return await this.teamsModel.updateOne({ _id }, { $set: updateTeamImageDto });
  }

  async deleteTeam(_id: string) {
    return await this.teamsModel.updateOne({ _id },{$set:{status:"delete"}});
  }

  async deleteTeamImage(_id: string) {
    return await this.teamsModel.updateOne(
      { _id }, 
      { $set: { _idImg: "", img: "" } }
    );
  }

  async existingTeamName(name: string, excludeId?: string) {
    const query = excludeId ? { name, _id: { $ne: excludeId },status:{$ne:"delete"} } : { name,status:{$ne:"delete"} };
    const countTeams = await this.teamsModel.countDocuments(query);
    return countTeams > 0;
  }

  async existingTeamId(_id: string) {
    const countTeams = await this.teamsModel.countDocuments({ _id ,status:{$ne:"delete"}});
    return countTeams > 0;
  }

  async getTeamImage(_id: string) {
    const team = await this.teamsModel.findById(_id, { _idImg: 1, img: 1 }).where({ status: { $ne: "delete" } });
    return team ? { _idImg: team._idImg, img: team.img } : null;
  }

  async findTeamsByImage(_idImg: string) {
    return await this.teamsModel.find({ 
      _idImg, 
      status: { $ne: "delete" } 
    });
  }

  async findTeamsByMember(memberId: string) {
    return await this.teamsModel.find({ members: memberId,status:{$ne:"delete"} });
  }

  async getTeamMembersCount(_id: string) {
    const team = await this.teamsModel.findById(_id, { members: 1 });
    return team ? team.members.length : 0;
  }

  async getTeamMembers(_id: string) {
    const team = await this.teamsModel.findById(_id, { members: 1 });
    return team ? team.members : [];
  }

  async existMemberTeam(_id:string,_idMember:string){
    const countMember=await this.teamsModel.countDocuments({_id,members:_idMember})
    return countMember>0
  }

  async addMember(_id:string,_idMember:string){
    return await this.teamsModel.updateOne({_id},{$push:{members:_idMember}})
  }
}