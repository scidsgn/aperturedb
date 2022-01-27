import { Entity } from "./types/Entity"
import { guardUserRole, User, UserRole } from "./User"
import { makeUUID, UUID } from "./types/UUID"
import { define, GuardFunction } from "./types/guard"
import { guardNullUndefined, guardTimeTravel } from "./types/guard/templates"
import { TestChamberDesign } from "../types/TestChamberDesign"
import { TestObject } from "./TestObject"

type TestChamberProperties = {
    name: string
    architectId: UUID

    design: TestChamberDesign

    createdAt?: Date
    modifiedAt?: Date

    testObjectId: UUID
}

export class TestChamber extends Entity<TestChamberProperties> {
    private constructor(properties: TestChamberProperties, id?: UUID) {
        super(
            properties, id,
            [
                define<TestChamberProperties>(
                    "name", guardNullUndefined as GuardFunction<TestChamberProperties>
                ),
                define<TestChamberProperties>(
                    "architectId", guardNullUndefined as GuardFunction<TestChamberProperties>
                ),
                define<TestChamberProperties>(
                    "design", guardNullUndefined as GuardFunction<TestChamberProperties>
                ),
                define<TestChamberProperties>(
                    "testObjectId", guardNullUndefined as GuardFunction<TestChamberProperties>
                ),
                
                define<TestChamberProperties>(
                    "modifiedAt",
                    guardTimeTravel<TestChamberProperties>("createdAt")
                ),
            ]
        )

        this.fill("createdAt", new Date())
        this.fill("modifiedAt", new Date())
    }

    get name(): string {
        return this.get("name") as string
    }

    get architectId(): UUID {
        return this.get("architectId") as UUID
    }

    get design(): TestChamberDesign {
        return this.get("design") as TestChamberDesign
    }

    get createdAt(): Date {
        return this.get("createdAt") as Date
    }

    get modifiedAt(): Date {
        return this.get("modifiedAt") as Date
    }

    get testObjectId(): UUID {
        return this.get("testObjectId") as UUID
    }

    public static create(data: TestChamberProperties & { id?: string }) {
        return new TestChamber(data, makeUUID(data.id))
    }
}