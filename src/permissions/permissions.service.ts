
import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { PermissionsRepository } from "./permissions.repository";
import { SavePermissionDto } from "./dto/SavePermission.dto";
import { UpdatePermissionDto } from "./dto/UpdatePermission.dto";
import { VerifyPermissionDto } from "./dto/VerifyPermission.dto";

@Injectable()
export class PermissionsService {
    constructor(private readonly permissionsRepository: PermissionsRepository) { }
    //   async findOneByEmail({ email }: EmailDto, ignoreAtt?: string[]) {
    //     const user = await this.permissionsRepository.findOneByEmail(email, ignoreAtt);
    //     if (!user) throw new NotFoundException("Usuario no encontrado");
    //     return user;
    //   }
    async updatePermissions(updatePermissionDto: UpdatePermissionDto) {
        const updateState = await this.permissionsRepository.updatePermissions(
            updatePermissionDto
        );
        if (updateState.matchedCount < 1)
            throw new NotFoundException("Permiso a actualizar no encontrado");
        if (updateState.modifiedCount < 1)
            throw new NotFoundException("Permiso encontrado, pero no actualizado");
        return { statusCode: 200, message: "Permiso actualizado con exito" };
    }
    async existingCode({ code }: { code: string }) {
        return await this.permissionsRepository.existingCode(code);
    }

    async savePermission(savePermissionDto: SavePermissionDto) {
        const existingCode = await this.permissionsRepository.existingCode(savePermissionDto.code)
        if (existingCode)
            throw new ForbiddenException("Ya existe un permiso con este codigo");
        return await this.permissionsRepository.savePermission(savePermissionDto);
    }
    async deletePermission({ code }: { code: string }) {
        const deleteState = await this.permissionsRepository.deletePermissions(code);
        if (deleteState.matchedCount < 1)
            throw new NotFoundException("Permiso  no encontrado");
        if (deleteState.modifiedCount < 1)
            throw new NotFoundException("Permiso ya eliminado anteriormente");
        return { statusCode: 200, message: "Permiso eliminado con exito" };
    }
     async getPermissions({ code }: { code: string }) {
        const permission=await this.permissionsRepository.getPermissions(code);
        if(!permission)
            throw new NotFoundException("Permisos  no encontrados");
        return { statusCode: 200, message: "Permisos obtenidos con exito",data:permission };
    }
     async verifyPermissions({ code,role }: VerifyPermissionDto) {
        const permission=await this.permissionsRepository.verifyPermissions(code,role);
        if(!permission)
            throw new NotFoundException("Permisos  no encontrados");
        return { statusCode: 200, message: "Permisos obtenidos con exito",data:permission };
    }
    async codesPermissions(){
        const permission=await this.permissionsRepository.codesPermissions();
        if(!permission)
            throw new NotFoundException("No hay ningun permiso creado");
        return { statusCode: 200, message: "Permisos obtenidos con exito",data:permission };
    }
}
