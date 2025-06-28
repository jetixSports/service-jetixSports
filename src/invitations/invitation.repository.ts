import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Invitation } from "./invitation.schema"; 
import { SaveInvitationDto } from "./dto/SaveInvitation.dto"; 
import { UpdateInvitationDto } from "./dto/UpdateInvitation.dto";

@Injectable()
export class InvitationsRepository {
  constructor(
    @InjectModel(Invitation.name, process.env.INVITATION_DB)
    private invitationModel: Model<Invitation>
  ) {}

  // Método para encontrar una invitación por ID
  async findOneById(id: string) {
    const invitation = await this.invitationModel.findById(id);
    if (!invitation) {
      throw new NotFoundException("Invitación no encontrada");
    }
    return invitation;
  }

  // Método para obtener todas las invitaciones
  async findAll() {
    return await this.invitationModel.find();
  }

  // Método para guardar una nueva invitación
  async saveInvitation(saveInvitationDto: SaveInvitationDto) {
    const newInvitation = new this.invitationModel(saveInvitationDto);
    const invitation = await newInvitation.save();
    return {
      statusCode: 200,
      message: "Invitación guardada con éxito",
      data: invitation,
    };
  }

  // Método para actualizar una invitación por ID
  async updateInvitation(id: string, updateInvitationDto: UpdateInvitationDto) {
    const invitation = await this.findOneById(id);
    return await this.invitationModel.updateOne({ _id: invitation._id }, { $set: updateInvitationDto });
  }

  // Método para eliminar una invitación por ID
  async remove(id: string) {
    const result = await this.invitationModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException("Invitación no encontrada");
    }
    return {
      statusCode: 200,
      message: "Invitación con ID ${id} eliminada con éxito",
    };
  }
}
