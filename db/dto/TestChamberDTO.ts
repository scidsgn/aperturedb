import { TestChamber } from "../../core/domain/TestChamber"
import { UUID } from "../../core/domain/types/UUID"
import { IDTO } from "./IDTO"

type TestChamberDTOProperties = {
    id?: string,
    name: string,
    architectId: string,
    design: object,
    createdAt: string,
    modifiedAt: string,
    testObjectId: string
}

export class TestChamberDTO implements IDTO {
    constructor(public data: TestChamberDTOProperties) {}

    public static fromDomain(entity: TestChamber) {
        return new TestChamberDTO({
            id: entity.identifier,
            name: entity.name,
            architectId: entity.architectId,
            design: entity.design,
            createdAt: entity.createdAt.toString(),
            modifiedAt: entity.modifiedAt.toString(),
            testObjectId: entity.testObjectId
        })
    }

    public static toDomain(dto: TestChamberDTO) {
        return TestChamber.create({
            id: dto.data.id as UUID,
            name: dto.data.name,
            architectId: dto.data.architectId as UUID,
            design: dto.data.design,
            createdAt: new Date(dto.data.createdAt),
            modifiedAt: new Date(dto.data.modifiedAt),
            testObjectId: dto.data.testObjectId as UUID
        })
    }
}