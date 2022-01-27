import { TestChamber } from "./TestChamber";
import { Entity } from "./types/Entity";
import { define, GuardFunction } from "./types/guard";
import { guardEach, guardNullUndefined } from "./types/guard/templates";
import { makeUUID, UUID } from "./types/UUID";
import { guardUserRole, User, UserRole } from "./User";

type TestTrackProperties = {
    name: string
    managerId: UUID
}

export class TestTrack extends Entity<TestTrackProperties> {
    private constructor(properties: TestTrackProperties, id?: UUID) {
        super(
            properties, id,
            [
                define<TestTrackProperties>(
                    "name", guardNullUndefined as GuardFunction<TestTrackProperties>
                ),
                define<TestTrackProperties>(
                    "managerId", guardNullUndefined as GuardFunction<TestTrackProperties>
                )
            ]
        )
    }

    get name(): string {
        return this.get("name") as string
    }

    get managerId(): UUID {
        return this.get("managerId") as UUID
    }

    public static create(data: TestTrackProperties & { id?: string }) {
        return new TestTrack(data, makeUUID(data.id))
    }
}