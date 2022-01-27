import { JwtPayload } from "jsonwebtoken";
import { IDTO } from "../dto/IDTO";
import { UserDTO, UserRoleDTO } from "../dto/UserDTO"
import { ICrudRepositoryService } from "./ICrudRepositoryService";

export interface IAuthUserService {
    getFromLoginData(userName: string, password: string): Promise<UserDTO>
    getFromToken(token: JwtPayload): Promise<UserDTO>
    ensureTokenRole(token: JwtPayload, targetRoles: UserRoleDTO[]): Promise<UserDTO>
    ensureObjectOwner<T extends IDTO>(
        user: UserDTO, objectService: ICrudRepositoryService<T>, ownerIdProperty: keyof T["data"], objectId: string
    ): Promise<void>
}