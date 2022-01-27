import { IUserRepository } from "../../core/repository/IUserRepository"
import { UserDTO, UserRoleDTO } from "../dto/UserDTO"
import { IAuthUserService } from "./IAuthUserService"

import bcrypt from "bcrypt"
import { JwtPayload } from "jsonwebtoken"
import { ICrudRepositoryService } from "./ICrudRepositoryService"
import { IDTO } from "../dto/IDTO"

export class AuthUserService implements IAuthUserService {
    constructor(private repo: IUserRepository) {}

    async getFromLoginData(userName: string, password: string): Promise<UserDTO> {
        const user = await this.repo.getByUsername(userName)
        if (!user) {
            return null
        }

        if (await bcrypt.compare(password, user.passwordHash)) {
            return UserDTO.fromDomain(user)
        }

        return null
    }

    async getFromToken(token: JwtPayload): Promise<UserDTO> {
        if (!token || !token.userName) {
            return null
        }

        const user = await this.repo.getByUsername(token.userName)

        return UserDTO.fromDomain(user)
    }

    async ensureTokenRole(token: JwtPayload, targetRoles: UserRoleDTO[]): Promise<UserDTO> {
        if (!token) {
            throw new Error("Invalid token.")
        }

        const user = await this.repo.getByUsername(token.userName)
        if (!user) {
            throw new Error("Invalid user.")
        }

        if (targetRoles.length && !targetRoles.includes(user.role as unknown as UserRoleDTO)) {
            throw new Error("Access denied.")
        }

        return UserDTO.fromDomain(user)
    }

    async ensureObjectOwner<T extends IDTO>(
        user: UserDTO, objectService: ICrudRepositoryService<T>, ownerIdProperty: keyof T["data"], objectId: string
    ): Promise<void> {
        const object: T = await objectService.get(objectId)
        if (!object) {
            throw new Error("Invalid object.")
        }

        if (object.data[ownerIdProperty] !== user.data.id) {
            throw new Error("Access denied.")
        }
    }
}