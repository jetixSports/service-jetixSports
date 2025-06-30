import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Invitation } from "./invitation.schema"; 
import { FindInvitationDto } from "./dto/UpdateInvitation.dto";
import { CreateInvitationDto } from "./dto/CreateInvitation.dto";

@Injectable()
export class InvitationsRepository {
  constructor(
    @InjectModel(Invitation.name, process.env.TOURNAMENTS_DB)
    private invitationModel: Model<Invitation>
  ) {}
  async find(findInvitationDto:FindInvitationDto) {
    const data=JSON.parse(JSON.stringify(findInvitationDto))    
    return await this.invitationModel.find(data);
  }

  // Método para guardar una nueva invitación
  async saveInvitation(createInvitationDto: CreateInvitationDto) {
    const newInvitation = new this.invitationModel(createInvitationDto);
    const invitation = await newInvitation.save();
    return {
      statusCode: 200,
      message: "Invitación guardada con éxito",
      data: invitation,
    };
  }

  async existInvitation(teamId:string,userId:string,status:string){
    const countInvitation=await this.invitationModel.countDocuments({teamId,userId,status})
    return countInvitation>0
  }
  async changeInvitation(findInvitationDto:FindInvitationDto,status:string){
    const data=JSON.parse(JSON.stringify(findInvitationDto))    
    return await this.invitationModel.updateOne(data,{$set:{status}})
  }
}
