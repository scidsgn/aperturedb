import { Entity } from "./types/Entity"
import { define, guardFactory, GuardFunction } from "./types/guard"
import { guardIsOneOf, guardNullUndefined } from "./types/guard/templates"
import { makeUUID, UUID } from "./types/UUID"

export enum UserRole {
    Administrator = "ADMINISTRATOR",
    TestTrackManager = "TESTTRACKMANAGER",
    TestSupervisor = "TESTSUPERVISOR",
    TestArchitect = "TESTARCHITECT"
}

type UserProperties = {
    userName: string
    displayName: string
    passwordHash: string
    role: UserRole
}

export class User extends Entity<UserProperties> {
    private constructor(properties: UserProperties, id?: UUID) {
        super(
            properties, id,
            [
                define<UserProperties>(
                    "userName", guardNullUndefined as GuardFunction<UserProperties>
                ),
                define<UserProperties>(
                    "displayName", guardNullUndefined as GuardFunction<UserProperties>
                ),
                define<UserProperties>(
                    "passwordHash", guardNullUndefined as GuardFunction<UserProperties>
                ),
                define<UserProperties>(
                    "role", guardNullUndefined as GuardFunction<UserProperties>
                ),

                define<UserProperties>(
                    "role", guardIsOneOf<UserProperties>([
                        UserRole.Administrator,
                        UserRole.TestArchitect,
                        UserRole.TestSupervisor,
                        UserRole.TestTrackManager
                    ])
                ),
            ]
        )
    }

    get userName(): string {
        return this.get("userName")
    }

    get displayName(): string {
        return this.get("displayName")
    }

    get passwordHash(): string {
        return this.get("passwordHash")
    }

    get role(): UserRole {
        return this.get("role") as UserRole
    }

    public static create(data: UserProperties & { id?: string }) {
        return new User(data, makeUUID(data.id))
    }
}

export const guardUserRole = (role: UserRole) => guardFactory(
    (v: User) => v.role === role,
    `does not have role ${role}.`
)