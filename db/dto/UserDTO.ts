import { UUID } from "../../core/domain/types/UUID"
import { User, UserRole } from "../../core/domain/User"
import { IDTO } from "./IDTO"

type UserDTOProperties = {
    id?: string
    userName: string
    displayName: string
    role: string
}

export class UserDTO implements IDTO {
    constructor(public data: UserDTOProperties) {}

    public static fromDomain(entity: User) {
        return new UserDTO({
            id: entity.identifier,
            userName: entity.userName,
            displayName: entity.displayName,
            role: entity.role
        })
    }

    public static toDomain(dto: UserDTO) {
        return User.create({
            id: dto.data.id as UUID,
            userName: dto.data.userName,
            displayName: dto.data.displayName,
            role: dto.data.role as UserRole,
            passwordHash: ""
        })
    }
}

export enum UserRoleDTO {
    Administrator = "ADMINISTRATOR",
    TestTrackManager = "TESTTRACKMANAGER",
    TestSupervisor = "TESTSUPERVISOR",
    TestArchitect = "TESTARCHITECT"
}