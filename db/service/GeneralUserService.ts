import { UUID } from "../../core/domain/types/UUID"
import { IUserRepository } from "../../core/repository/IUserRepository"
import { UserDTO } from "../dto/UserDTO"
import { IGeneralUserService } from "./IGeneralUserService"

export class GeneralUserService implements IGeneralUserService {
    constructor(private repo: IUserRepository) {}

    async getAll(): Promise<UserDTO[]> {
        const entities = await this.repo.getAll()

        return entities.map(ent => UserDTO.fromDomain(ent))
    }

    async getById(id: string): Promise<UserDTO> {
        return UserDTO.fromDomain(
            await this.repo.get(id as UUID)
        )
    }

    async getByUsername(userName: string): Promise<UserDTO> {
        return UserDTO.fromDomain(
            await this.repo.getByUsername(userName)
        )
    }
}