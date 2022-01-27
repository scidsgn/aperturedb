import { TestObject } from "../../core/domain/TestObject";
import { UUID } from "../../core/domain/types/UUID";
import { IDTO } from "./IDTO";

type TestObjectDTOProperties = {
    id?: string,
    name: string
}

export class TestObjectDTO implements IDTO {
    constructor(public data: TestObjectDTOProperties) {}

    public static fromDomain(entity: TestObject) {
        return new TestObjectDTO({
            id: entity.identifier,
            name: entity.name
        })
    }

    public static toDomain(dto: TestObjectDTO) {
        return TestObject.create({
            id: dto.data.id as UUID,
            name: dto.data.name
        })
    }
}