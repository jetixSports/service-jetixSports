
import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { RolesRepository } from "./roles.repository";
import { UsersService } from "src/users/users.service";
import { SaveRolesDto } from "./dto/SaveRoles.dto";
import { FindByCodeDto } from "./dto/FindByCode.dto";


@Injectable()
export class RolesService {
    constructor(private readonly rolesRepository: RolesRepository,
    ) { }
    async saveRoles(saveRolesDto: SaveRolesDto) {
        const existRole = await this.rolesRepository.existingRole(saveRolesDto.code)
        if (existRole)
            throw new ForbiddenException("Ya existe un rol con este codigo");
        const newRole = await this.rolesRepository.saveRoles(saveRolesDto)
        return { ...newRole, data: {} }
    }
    async updateRole(updateRoleDto: SaveRolesDto) {
        const updateState = await this.rolesRepository.updateRole(updateRoleDto)
        if (updateState.matchedCount < 1)
            throw new NotFoundException("Rol a actualizar no encontrado");
        if (updateState.modifiedCount < 1)
            throw new NotFoundException("Rol encontrado, pero no actualizado");
        return { statusCode: 200, message: "Rol actualizado con exito" };
    }
    async findAllRole() {
        const roles = await this.rolesRepository.findAllRole()
        if (roles.length == 0)
            throw new NotFoundException("No se encontro ningun rol");
        return { statusCode: 200, message: "Roles encontrados con exito", data: { roles } }
    }

    async findRole({ code }: FindByCodeDto) {
        const roles = await this.rolesRepository.findRole(code)
        if (roles.length == 0)
            throw new NotFoundException("No se encontro ningun rol");
        return { statusCode: 200, message: "Roles encontrados con exito", data: { roles } }
    }
}
