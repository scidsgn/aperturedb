import { Entity } from "./types/Entity";
import { makeUUID, UUID } from "./types/UUID";

type TestObjectProperties = {
    name: string
}

export class TestObject extends Entity<TestObjectProperties> {
    private constructor(properties: TestObjectProperties, id?: UUID) {
        super(
            properties, id
        )
    }

    get name(): string {
        return this.get("name") as string
    }

    public static create(data: TestObjectProperties & { id?: string }) {
        return new TestObject(data, makeUUID(data.id))
    }
}