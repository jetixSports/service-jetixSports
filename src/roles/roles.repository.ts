
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Roles } from "./roles.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { SaveRolesDto } from "./dto/SaveRoles.dto";

@Injectable()
export class RolesRepository {
  constructor(
    @InjectModel(Roles.name, process.env.AUTH_DB)
    private rolesModel: Model<Roles>
  ) {}
  async existingRole(code: string) {
    const countCodes = await this.rolesModel.countDocuments({ code });
    return countCodes > 0;
  }
  async saveRoles(saveRolesDto: SaveRolesDto){
    const newRole= new this.rolesModel(saveRolesDto);
    const role = await newRole.save();
    return {
      statusCode: 200,
      message: "Rol guardado con exito",
      data: role,
    };
  }
  async updateRole(updateRoleDto:SaveRolesDto){
    return this.rolesModel.updateOne(
        {code:updateRoleDto.code},
        {$set:{name:updateRoleDto.name}}
    )
  }
  async findAllRole(){
    return this.rolesModel.find({},{_id:0,__v:0})
  }
  async findRole(code:string){
    return this.rolesModel.find({code: { $regex: code,$options: 'i' }},{__v:0,_id:0})
  }
}
