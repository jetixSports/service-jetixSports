import { Body, Controller, Delete, Get, Post, Put, Req, ValidationPipe } from "@nestjs/common";
import { PermissionsService } from "./permissions.service";
import { SavePermissionDto } from "./dto/SavePermission.dto";
import { Auth } from "src/decorators/auth/auth.decorator";
import { UpdatePermissionDto } from "./dto/UpdatePermission.dto";
import { VerifyPermissionDto } from "./dto/VerifyPermission.dto";
import { Permissions } from "src/decorators/permissions/permissions.decorator";

@Controller("permissions")
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}
  @Auth("NoAuth")
  @Post()
  savePermission(@Req() request: Request, @Body(ValidationPipe) savePermissionDto: SavePermissionDto) {
    return this.permissionsService.savePermission(savePermissionDto)
  }
  @Auth("NoAuth")
  @Put()
  updatePermissions(@Req() request: Request, @Body(ValidationPipe) updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsService.updatePermissions(updatePermissionDto)
  }
  @Auth("NoAuth")
  @Delete()
  deletePermission(@Req() request: Request, @Body(ValidationPipe) deletePermissionDto: SavePermissionDto) {
    return this.permissionsService.deletePermission(deletePermissionDto)
  }
  @Auth("NoAuth")
  @Post('findByCode')
  getPermissions(@Req() request: Request, @Body(ValidationPipe) getPermissionsDto: SavePermissionDto) {
    return this.permissionsService.getPermissions(getPermissionsDto)
  }
   @Auth("NoAuth")
  @Post('verify')
  verifyPermissions(@Req() request: Request, @Body(ValidationPipe) verifyPermissionDto: VerifyPermissionDto) {
    return this.permissionsService.verifyPermissions(verifyPermissionDto)
  }
  @Auth("Auth")
  @Permissions(["curs11wo"])
  @Get()
  codesPermissions(@Req() request: Request) {
    return this.permissionsService.codesPermissions()
  }
}

