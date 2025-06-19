
import { Body, Controller, Get, Param, Post, Put, Req, ValidationPipe } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { SaveRolesDto } from "./dto/SaveRoles.dto";
import { Auth } from "src/decorators/auth/auth.decorator";
import { Permissions } from "src/decorators/permissions/permissions.decorator";
import { FindByCodeDto } from "./dto/FindByCode.dto";

@Controller("roles")
export class RolesController {
  constructor(
    private readonly rolesService: RolesService
) {}
  @Permissions(["roles"],'CREATE')
  @Auth("Auth")
  @Post()
  saveRoles(@Req() request: Request, @Body(ValidationPipe) saveRolesDto: SaveRolesDto){
    return this.rolesService.saveRoles(saveRolesDto)
  }

  @Permissions(["roles"],'UPDATE')
  @Auth("Auth")
  @Put()
  updateRole(@Req() request: Request, @Body(ValidationPipe) updateRoleDto: SaveRolesDto){
    return this.rolesService.updateRole(updateRoleDto)
  }

  @Auth("NoAuth")
  @Get()
  findAllRole(@Req() request: Request, ){
    return this.rolesService.findAllRole()
  }

  @Auth("NoAuth")
  @Get(":code")
  findRole(@Req() request: Request,@Param() findByCodeDto:FindByCodeDto){
    const code=findByCodeDto.code.replace(":","")
    return this.rolesService.findRole({code})
  }
}
