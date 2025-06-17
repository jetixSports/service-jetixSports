
import {
    Injectable,
} from "@nestjs/common";
import { Permissions } from "./permissions.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { SavePermissionDto } from "./dto/SavePermission.dto";
import { UpdatePermissionDto } from "./dto/UpdatePermission.dto";

@Injectable()
export class PermissionsRepository {
    constructor(
        @InjectModel(Permissions.name, process.env.AUTH_DB)
        private permissionsModel: Model<Permissions>
    ) { }
    async updatePermissions(updatePermissionsDto: UpdatePermissionDto) {
        let updateQuery: {
            $addToSet: {
                [key: string]: { $each: string[] };
            };
            $pull: { [key: string]: { $in: string[] } };
        } = {
            $addToSet: {},
            $pull: {},
        };
        Object.entries(updatePermissionsDto.update).forEach(
            ([key, item]) => {
                ['READ', 'UPDATE', 'CREATE', 'DELETE'].forEach((element) => {
                    if (item?.[element]) {
                        updateQuery.$addToSet[element] = updateQuery.$addToSet?.[
                            element
                        ] ?? {
                            $each: [],
                        };
                        updateQuery.$addToSet?.[element].$each.push(key);
                    } else {
                        updateQuery.$pull[element] = updateQuery.$pull?.[element] ?? {
                            $in: [],
                        };
                        updateQuery.$pull?.[element].$in.push(key);
                    }
                });
            },
        );
        const { matchedCount, modifiedCount } = await this.permissionsModel.bulkWrite([
            ...(Object.keys(updateQuery.$addToSet).length > 0
                ? [
                    {
                        updateOne: {
                            filter: { code: updatePermissionsDto.code, status: true },
                            update: { $addToSet: updateQuery.$addToSet },
                        },
                    },
                ]
                : []),
            ...(Object.keys(updateQuery.$pull).length > 0
                ? [
                    {
                        updateOne: {
                            filter: { code: updatePermissionsDto.code, status: true },
                            update: { $pull: updateQuery.$pull },
                        },
                    },
                ]
                : []),
        ]);

        return { matchedCount, modifiedCount }
    }
    async existingCode(code: string) {
        const countPermission = await this.permissionsModel.countDocuments({ code, status: true });
        return countPermission > 0;
    }
    async savePermission(savePermissionDto: SavePermissionDto) {
        const newUser = new this.permissionsModel(savePermissionDto);
        const user = await newUser.save();
        return {
            statusCode: 200,
            message: "Permiso guardado con exito",
            data: user,
        };
    }
    async deletePermissions(code: string) {
        return await this.permissionsModel.updateOne({ code, status: true }, { $set: { status: false } })
    }
    async getPermissions(code: string) {
        const permission = await this.permissionsModel.aggregate([
            {
                $match: {
                    code, status: true
                },
            },
            {
                $project: {
                    _id: 0,
                    code: 1,
                    status: 1,
                    allRoles: {
                        $setUnion: [
                            { $ifNull: ["$READ", []] },
                            { $ifNull: ["$UPDATE", []] },
                            { $ifNull: ["$CREATE", []] },
                            { $ifNull: ["$DELETE", []] }
                        ]
                    },
                    READ: 1,
                    UPDATE: 1,
                    CREATE: 1,
                    DELETE: 1
                }
            },
            {
                $project: {
                    code: 1,
                    status: 1,
                    roles: {
                        $arrayToObject: {
                            $map: {
                                input: "$allRoles",
                                as: "role",
                                in: {
                                    k: "$$role",
                                    v: {
                                        CREATE: { $in: ["$$role", "$CREATE"] },
                                        UPDATE: { $in: ["$$role", "$UPDATE"] },
                                        DELETE: { $in: ["$$role", "$DELETE"] },
                                        READ: { $in: ["$$role", "$READ"] }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            {
                $replaceRoot: {
                    newRoot:
                        "$roles"
                }
            }
        ])
        return Object.keys(permission[0] ?? {}).length > 0 ? permission[0] : undefined
    }
    async verifyPermissions(code: string[], role: string) {
        const permission = await this.permissionsModel.aggregate([
            {
                $match: {
                    code: { $in: code },
                    status: true
                }
            },
            {
                $project: {
                    _id: 0,
                    code: 1,
                    permissions: {
                        READ: { $in: [role, "$READ"] },
                        CREATE: { $in: [role, "$CREATE"] },
                        UPDATE: { $in: [role, "$UPDATE"] },
                        DELETE: { $in: [role, "$DELETE"] }
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    results: {
                        $push: {
                            k: "$code",
                            v: "$permissions"
                        }
                    }
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $arrayToObject: "$results"
                    }
                }
            }
        ])
        return Object.keys(permission[0] ?? {}).length > 0 ? permission[0] : undefined
    }
    async codesPermissions() {
        const permission = await this.permissionsModel.aggregate([
            {
                $match: {
                    status: true
                }
            },
            {
                $group: {
                    _id: null,
                    codes: { $push: "$code" }
                }
            },
            {
                $project: {
                    _id: 0,
                    codes: 1
                }
            }
        ])
        return Object.keys(permission[0] ?? {}).length > 0 ? permission[0] : undefined
    }
}
